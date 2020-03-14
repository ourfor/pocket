export function saveCSV(filename,data) {
    const blob = new Blob(["\ufeff" + data],{ type: "application/csv;charset=UTF-8" });
    const a = document.createElement('a');
    a.download = `${filename}.csv`;
    a.href = URL.createObjectURL(blob);

    const event = new MouseEvent('click');
    event.initEvent('click',false,false);

    a.dispatchEvent(event);
}