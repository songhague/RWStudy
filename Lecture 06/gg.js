function ha() 
{
    document.getElementById("d0").innerHTML = "■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■";
    document.getElementById("d1").innerHTML = "■ ■ ■ ■ ■ ■ ■ ■ ■";
    document.getElementById("d2").innerHTML = "■ ■ ■ ■ ■ ■ ■";
    document.getElementById("d3").innerHTML = "■ ■ ■ ■ ■";
    document.getElementById("d4").innerHTML = "■ ■ ■";
    document.getElementById("d5").innerHTML = "■";

    var array = [];

    array.push("어렵네");
    array.push("아");
    array.push("제발");
    array.push("으엥");
    array.push("송하규");

    //console.log(array.pop());
   // console.log(array.pop());
    //console.log(array.pop());
   // console.log(array.pop());
   // console.log(array.pop());

    console.log(array.shift());
    console.log(array.shift());
    console.log(array.shift());
    console.log(array.shift());
    console.log(array.shift());
}