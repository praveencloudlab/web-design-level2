'use strict';
/**
 * data types
 * 1.basic types
 * 2.object types
 * 
 *  * 1.basic types
    ===============
    a.number
    b.string
    c.boolean
    d.undefined

 * 
 */


    // number

    var a=76;
    a=98.65;

    // string

    a="s1"
    a='hello world'
    a='hello ' + 'im praveen'
    var s2='praveen';
    a=`hello ${s2} `;

    var template=
    `
    <div>
        <div>
            <h3>hello world</h3>
            <h4>sample text</h4>
        </div>
    </div>
    `
    //document.getElementById('id1').innerHTML=template

    // boolean : true or false
    var isloaded=false;

    // undefined

    var s3;

    /**
     * note: 
     * falsey values in javascript
     * false,null, undefined,0
     * 
     */

    // 2 objects
    //==============
    //var animal={
      //  aname:'dog',
       // color:'white'
    //}
    //animal.age=2;
    //Object.preventExtensions(animal);
   // animal.type='indian';
   //Object.freeze(animal);
   // animal.aname='cat';

   var animals=[
    {id:10,name:'Dog',age:3,instock:true},
    {id:11,name:'Cat',age:1,instock:false},
    {id:12,name:'Rabbit',age:2,instock:true}
   ]

   //animals.forEach(animal=>{
    //console.log(animal);
   //})

   animals.push({id:13,name:'Duck',age:3,instock:true}) // mutable. original object gets effected
   var obj1={id:14,name:'Hen',age:0.4,instock:false}

   var newObj=animals.concat(obj1); // immutable: can not edit original object

   // edit existing object content
   // first find the editable object

   var updatedObj=newObj.filter(obj=>!(obj.instock));
   //Object.assign({name:'some'},{id:11},newObj)


