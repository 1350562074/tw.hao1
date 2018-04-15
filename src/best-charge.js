var loadAllItems = require('../src/items.js');
var loadPromotions = require('../src/promotions.js');
loadAllItems =loadAllItems();
loadPromotions = loadPromotions();

function bestCharge(selectedItems) {
  var result ='';
  result +="============= 订餐明细 ============="+'\n';
  var temp =[];
  var sum1 =0;
  var sum2 =0;
  var sum =0;
for(var i=0;i<selectedItems.length;i++)
{
    var id=selectedItems[i].substr(0,8);
    var count=selectedItems[i].substr(11,1);
    temp.push({"id":id,"count":count});
}
for(var i=0;i<temp.length;i++)
{
  for(var j=0;j<loadAllItems.length;j++)
  {
    if(loadAllItems[j].id==temp[i].id)
    {
      result +=loadAllItems[j].name +' x '+temp[i].count +' = '+ loadAllItems[j].price*temp[i].count+"元"+'\n';
      for(var k=0;k<loadPromotions[1].items.length;k++)
      {
        if(temp[i].id==loadPromotions[1].items[k])
        {
          sum1 += loadAllItems[j].price*temp[i].count/2;
        }
      }
      sum2 += loadAllItems[j].price*temp[i].count;
    } 
  }
}
sum =sum2-sum1;
result +='-----------------------------------'+'\n';
if(sum2>=30)
{
  var sum3 =sum2-6;
  if(sum3>sum)
  {
    result +="使用优惠:"+'\n'+loadPromotions[1].type+"(黄焖鸡，凉皮)，省"+sum1+"元"+'\n';
    result +="-----------------------------------"+'\n';
    result +="总计："+sum+"元"+'\n';
  }
  else if(sum3<=sum)
  {
    result +="使用优惠:"+'\n'+loadPromotions[0].type+"，省"+"6元"+'\n';
    result +="-----------------------------------"+'\n';
    result +="总计："+sum3+"元"+'\n';
  }
}
else if(sum2<30)
{
  if(sum1==0)
  {
    result +="总计："+sum+"元"+'\n';
  }
  else if(sum1!=0)
  {
    result +="使用优惠:"+'\n'+loadPromotions[1].type+"(黄焖鸡，凉皮)，省"+sum1+"元"+'\n';
    result +="-----------------------------------"+'\n';
    result +="总计："+sum+"元"+'\n';
  }
}

result +="==================================="+'\n';
return /*TODO*/result;

}
module.exports = bestCharge;
