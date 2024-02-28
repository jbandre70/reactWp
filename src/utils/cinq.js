export function cinq(el) {
/*    console.log(el);
    if(el !== "Dioramas")*/
     el = el.substring(0, 5);
    
    return (el.replace(' ', '_'));
}