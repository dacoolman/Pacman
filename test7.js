
var num = 4;
var numfunc = setInterval(
  function(){num = num-1;
         if (num==0)
         {console.log("Go!");}
             else{
               console.log(num);}
                 if (num<1){clearInterval(numfunc);}
           }, 1000);
setTimeout(function(){console.log("hello");}, 4000);


     