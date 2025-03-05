describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  it("解析器测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");

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

    cy.get("@textarea").type(testText);

    cy.get("@result").find("p").eq(0).should("contain.text", "This is some test text.");
    cy.get("@result").find("strong").should("contain.text", "bold text");
    cy.get("@result").find("em").should("contain.text", "italicized text");
    cy.get("@result").find("blockquote").should("contain.text", "blockquote");
    cy.get("@result").find("h1").should("contain.text", "H1");
    cy.get("@result").find("h2").should("contain.text", "H2");
    cy.get("@result").find("h3").should("contain.text", "H3");
    cy.get("@result").find("h4").should("contain.text", "H4");
    cy.get("@result").find("h5").should("contain.text", "H5");
    cy.get("@result").find("h6").should("contain.text", "H6");
    cy.get("@result").find("ol>li").should("contain.text", "First item");
    cy.get("@result").find("ol>li").should("contain.text", "Second item");
    cy.get("@result").find("ol>li").should("contain.text", "Third item");
    cy.get("@result").find("ul>li").should("contain.text", "First item");
    cy.get("@result").find("ul>li").should("contain.text", "Second item");
    cy.get("@result").find("ul>li").should("contain.text", "Third item");
    cy.get("@result").find("hr").should('exist');
    cy.get("@result").find("p > a")
      .should("have.attr", "href", "https://www.baidu.com")
      .should("have.attr", "target", "_blank")
      .should("contain.text", "title");
    cy.get("@result")
      .find("a:not(p > a)") // 排除上一項的干擾
      .should("have.attr", "href", "https://www.baidu.com");
    cy.get("@result")
      .find("a:not(p > a) > img")
      .should("have.attr", "src", "image.jpg")
      .should("have.attr", "alt", "百度");
    cy.get("@result").find("s").should("contain.text", "删除线");
  });

  it("加粗按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="bold"]').as("bold");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@bold").click();

    cy.get("@result").find("strong").should("contain.text", "This is some test text.");
  });

  it("斜体按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="italic"]').as("italic");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@italic").click();

    cy.get("@result").find("em").should("contain.text", "This is some test text.");
  });

  it("删除线按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="strikethrough"]').as("strikethrough");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@strikethrough").click();

    cy.get("@result").find("s").should("contain.text", "This is some test text.");
  });

  it("引用按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="quote"]').as("quote");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@quote").click();

    cy.get("@result").find("blockquote").should("contain.text", "This is some test text.");
  });

  it("H1按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="h1"]').as("h1");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@h1").click();

    cy.get("@result").find("h1").should("contain.text", "This is some test text.");
  });

  it("H2按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="h2"]').as("h2");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@h2").click();

    cy.get("@result").find("h2").should("contain.text", "This is some test text.");
  });

  it("H3按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="h3"]').as("h3");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@h3").click();

    cy.get("@result").find("h3").should("contain.text", "This is some test text.");
  });

  it("h4按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="h4"]').as("h4");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@h4").click();

    cy.get("@result").find("h4").should("contain.text", "This is some test text.");
  });

  it("h5按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="h5"]').as("h5");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@h5").click();

    cy.get("@result").find("h5").should("contain.text", "This is some test text.");
  });

  it("h6按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="h6"]').as("h6");
    const testText = `This is some test text.`;

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@h6").click();

    cy.get("@result").find("h6").should("contain.text", "This is some test text.");
  });

  it("水平线按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="horizontal line"]').as("horizontal line");
    cy.get("@horizontal line").click();

    cy.get("@result").find("hr").should('exist');
  });

  it("有序列表按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="ol"]').as("ol");
    const testText = 'First item\nSecond item\nThird item';

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@ol").click();

    cy.get("@result").find("ol>li").should("contain.text", "First item");
    cy.get("@result").find("ol>li").should("contain.text", "Second item");
    cy.get("@result").find("ol>li").should("contain.text", "Third item");
  });

  it("无序列表按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="ul"]').as("ul");
    const testText = 'First item\nSecond item\nThird item';

    cy.get("@textarea").type(testText).invoke("select");
    cy.get("@ul").click();

    cy.get("@result").find("ul>li").should("contain.text", "First item");
    cy.get("@result").find("ul>li").should("contain.text", "Second item");
    cy.get("@result").find("ul>li").should("contain.text", "Third item");
  });

  it("表格按钮测试", () => {
    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="table"]').as("table");

    cy.get("@table").click();
    cy.contains('button','确定').click();

    cy.get("@result").find("table>>tr").should('have.length', 3);
    cy.get('@result').find('tr:first-child td').should('have.length', 2);
    cy.get('@result').find('tr:nth-child(2) td').should('have.length', 2);
    cy.get('@result').find('tr:last-child td').should('have.length', 2);
  });

  it("图片按钮测试", () => {

    //这边标红了但是可以跑。。。。？？？
    cy.on('window:alert', (message) => {
      expect(message).to.equal('图片地址和图片链接不能为都为空。');
    });

    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="image"]').as("image");

    
    cy.get("@image").click();
    cy.contains('button','确定').click();

    cy.get("@image").click();
    cy.get('input[type="text"]').last().type('https://img2.baidu.com/it/u=712329742,3134533199&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500');
    cy.contains('button','确定').click();

    cy.get("@result")
      .find("a") 
      .should("have.attr", "href", "https://img2.baidu.com/it/u=712329742,3134533199&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500");
    cy.get("@result")
      .find("a > img")
      .should("have.attr", "src", "https://img2.baidu.com/it/u=712329742,3134533199&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500");
  });


  it("链接按钮测试", () => {

    //这边标红了但是可以跑。。。。？？？
    cy.on('window:alert', (message) => {
      expect(message).to.equal('链接地址不能为空。');
    });

    cy.get('[data-testid="my-textarea"]').as("textarea");
    cy.get('[data-testid="result"]').as("result");
    cy.get('[data-testid="link"]').as("link");

    
    cy.get("@link").click();
    cy.contains('button','确定').click();

    cy.get("@link").click();
    cy.get('input[type="text"]').first().type('https://www.baidu.com');
    cy.contains('button','确定').click();

    cy.get("@result")
      .find("a") 
      .should("have.attr", "href", "https://www.baidu.com");
    });
});
