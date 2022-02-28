function update(){
       /*alert(t);*/
           var sum=0;
             for(var h=0;h<c;h++){
                 var a=$("#ty"+t+"a"+h).text();
                var b=Number(a);
                 sum+=b;
             }
              var totalar= sum.toFixed(2);
      
     var item_nm="";
     var name=$("#name").val();
     var adress=$("#adress").val();
     var phone=$("#phone").val();
     var date=$("#date").val();
     var vehicle=$("#vehicle").val();
     var con=document.getElementById('selecto').value;
   var pra=[name,adress,phone,date,con,vehicle];

     for(var g=1;g<=t;g++){

      var item_name=$("#ty"+g).text();
     var to=$("#tyt"+g).text();
     if(to==""){
         var total=totalar;
     }
     else{
         var total=to;
     }
      if(item_name!=""){
          
        for(var f=0;f<c;f++){
           
          var x="";
         var  l=$("#ty"+g+"l"+f).val();
        var  w=$("#ty"+g+"w"+f).val();
     var  l1=$("#ty"+g+"l1-"+f).val();
        var  w1=$("#ty"+g+"w1-"+f).val();
        var  l2=$("#ty"+g+"l2-"+f).val();
        var  w2=$("#ty"+g+"w2-"+f).val();
        var  l3=$("#ty"+g+"l3-"+f).val();
        var  w3=$("#ty"+g+"w3-"+f).val();
        var are=$("#ty"+g+"a"+f).text();
        var serial =$("#ty"+g+"s"+f).text();
       // alert(serial);
          if(l==undefined||w==undefined){
             
          } 
          else{
          
        
        elem++;
            
           
           x+=item_name+"-"+l+"-"+w+"-"+l1+"-"+w1+"-"+l2+"-"+w2+"-"+l3+"-"+w3+"-"+are+"-"+total+"-"+serial;


            array[elem-1]=x;
            
      
          
         



}


        }
        
        
      }

     

     }
     
     localStorage.setItem("unsaved",JSON.stringify(pra));





    window.location.href="pdf1.html";

      }