export class OtherDetail {

    category: any="";
    rollnumber:any="";
    studentname:any="";
    programname:any="";
    rectype:any="";
    semesterstartdate:any="";
    semesterenddate:any="";
    latefee:any="";
    entityid:any="";
    programid:any="";
    semester:any="";
    feepending:any="";
    feetype:any="";
    coma:string=",";
    enrolno:string="";
    address:string="";
    pincode:string="";
   
    phone:string="";
    mode:string="";
    dob:string="";
    certificatetype:string="";
    
   
   
   
    
        
    constructor(){
       

    }

 public  otherdetailforcontinue():string{

         return  (
         this.category 
         +this.coma+this.rollnumber
         +this.coma+this.studentname
         +this.coma+this.programname
         +this.coma+this.rectype
         +this.coma+this.semesterstartdate
         +this.coma+this.semesterenddate 
         +this.coma+this.latefee
         +this.coma+this.entityid
         +this.coma+this.programid
         +this.coma+this.semester
         +this.coma+this.feepending
         +this.coma+this.feetype);
    }
    public  otherdetailforcertificate():string{

        return  (
        this.category 
        +this.coma+this.rollnumber
        +this.coma+this.enrolno
        +this.coma+this.studentname
        +this.coma+this.programname
        +this.coma+this.rectype
        +this.coma+this.address
        +this.coma+this.pincode 
        +this.coma+this.phone
        +this.coma+this.mode
        +this.coma+this.programid
        +this.coma+this.semester
        +this.coma+this.certificatetype
        );
   }


}
