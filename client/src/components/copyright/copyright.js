export function copyright(){
    const template = `\n %c 🍓 Zip Pocket Project ${pkg.version} %c 🎁 pocket.ourfor.top \n\n`
    const style = {
        start: "color: #fadfa3; background: #030307; padding:5px 0;",
        end: "color: white; background: #be0ceb; padding:5px 0;"
    }
    log(template,style.start,style.end)
}