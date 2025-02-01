const headers = (text: string) => {
    let level = 0;
    for(let i = 0; i < String.length; i++){
        if(text[i] !== '#'){
            break;
        }
        level++;
    }
    const hstart = `<h${level}>`;
    const content = hstart.concat((text.slice(level+2)).concat(`</h${level}>`));
    return content;
}

console.log(headers('## Second'));
