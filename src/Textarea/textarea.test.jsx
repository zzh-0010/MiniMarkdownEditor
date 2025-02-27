import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { colorTheme } from "../styled/themes";
import { Textarea } from "./Textarea";

//即使代码是同步的，也建议在测试中使用 waitFor 来包裹你的断言。
// 这可以提高你的测试代码的鲁棒性，
// 并避免由于一些意外的异步操作而导致测试失败。


test("用户输入文本时，markdown语法解析器解析，右边区输出结果", async () => {
  const mode = 0;
  const inputText = vi.fn();
  const user = userEvent.setup();

  render(
    <ThemeProvider theme={colorTheme[mode]}>
      <Textarea toggleTheme={() => {}} mode={0} />
    </ThemeProvider>
  );

  const textarea = screen.getByRole("textbox");
  const section = screen.getByRole("region");

  const testText = `This is some test text.
**bold text**
*italicized text*`

  fireEvent.change(textarea, { target: { value: testText } });

  await waitFor(() => {
    expect(section.innerHTML).toContain("<p>This is some test text.</p>");
    expect(section.innerHTML).toContain("<strong>bold text</strong>");
    expect(section.innerHTML).toContain("<em>italicized text</em>");
  });
});

