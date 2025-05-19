export class Command {

    procedure :string='';
    parameters:string[]  
    constructor(){
        this.parameters=[];
    }
    addParameter(key:string,value:any) {
        let param =  "@" + key + "=";

        if(!value && value != null){
            value="";
        }

        if(value === undefined){
            value="";
        }
       

        if(isNaN(value) || value === ""){
            value=value.replace("'","''");
           param += "'"+value+"'";
         }else{
            //if(value === null){value=''}

            param+=value;
         }
        

        this.parameters.push(param)
    }
}
