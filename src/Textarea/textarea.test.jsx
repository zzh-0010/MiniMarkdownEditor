import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { colorTheme } from "../styled/themes";
import { Textarea } from "./Textarea";
import React from 'react';

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
*italicized text*
> blockquote
# H1
## H2
### H3
#### H4
##### H5
###### H6
1. First item
2. Second item
3. Third item
- First item
- Second item
- Third item
---
[title](https://www.baidu.com)
[![百度](image.jpg)](https://www.baidu.com)
~~删除线~~
`;
  fireEvent.change(textarea, { target: { value: testText } });

  await waitFor(() => {
    expect(section.innerHTML).toContain("<p>This is some test text.</p>");
    expect(section.innerHTML).toContain("<strong>bold text</strong>");
    expect(section.innerHTML).toContain("<em>italicized text</em>");
    expect(section.innerHTML).toContain("<blockquote>blockquote</blockquote>");
    expect(section.innerHTML).toContain("<h1>H1</h1>");
    expect(section.innerHTML).toContain("<h2>H2</h2>");
    expect(section.innerHTML).toContain("<h3>H3</h3>");
    expect(section.innerHTML).toContain("<h4>H4</h4>");
    expect(section.innerHTML).toContain("<h5>H5</h5>");
    expect(section.innerHTML).toContain("<h6>H6</h6>");
    expect(section.innerHTML).toContain(
      "<ol><li> First item</li><li> Second item</li><li> Third item</li></ol>"
    );
    expect(section.innerHTML).toContain(
      "<ul><li>First item</li><li>Second item</li><li>Third item</li></ul>"
    );
    expect(section.innerHTML).toContain('<a href="https://www.baidu.com" target="_blank">title</a>');
    expect(section.innerHTML).toContain('<a href="https://www.baidu.com"><img src="image.jpg" alt="百度"></a>');
    expect(section.innerHTML).toContain("<s>删除线</s>");
  });
});

