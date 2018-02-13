var i=0;
function display(){

var n = i.toString();

axios.get('https://api.coinmarketcap.com/v1/ticker/?start='+n+'&limit=50')
.then(res => {
//var coinslist = res.data.Data;
//coinslist = sortProperties(coinslist);
console.log(res.data);
var rows = "";

$.each(res.data, function(){

    var colour="";
    var sign="";
    var onedayvalume=res.data[0]['24h_volume_usd'];


    if(this.percent_change_24h<0)
    {
      colour="red";

    }
    else {
        colour="green";
        sign="+";
    }
    i++;
    rows += "<tr><td>"+ i + "</td><td>"+this.name + "</td><td>" +"$  &nbsp " +this.market_cap_usd + "</td><td>" + "$  &nbsp " +this.price_usd+ "</td><td>" +"$  &nbsp " + onedayvalume+"</td><td>" +this.available_supply +"</td><td>" +"<span style=color:"+colour+">"+sign+this.percent_change_24h+"</span>"+"</td></tr>";

});

$( rows ).appendTo( "#coinslist tbody" );
})
// for throwing error
.catch(function (error) {
  console.log(error);
});
}
display();

function next()
{
  var myTable = document.getElementById("coinslist");
var rowCount = myTable.rows.length;
for (var x=rowCount-1; x>0; x--) {
   myTable.deleteRow(x);
}
 display();
}

function previous()
{ //console.log(i);
  if(i>0)
  {   var myTable = document.getElementById("coinslist");
      var rowCount = myTable.rows.length;
      for (var x=rowCount-1; x>0; x--) {
      myTable.deleteRow(x);
      }

    i=i-100;
    display();
  }
}
