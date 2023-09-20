import { LightningElement, wire, api } from 'lwc';
// import getOpportunityListWithDate from '@salesforce/apex/OpportunityController.getOpportunityListWithDate'
// import getOpportunityListWithList from '@salesforce/apex/OpportunityController.getOpportunityListWithList'
import getOpportunityList from '@salesforce/apex/OpportunityListController.opportunitiesList';
// import ACC from '@salesforce/schema/Opportunity.Account'
import ACC_NAME from '@salesforce/schema/Opportunity.Account.Name'


export default class CustomOpportunityListView extends LightningElement {
    acc= ACC_NAME
    opportunityList;
    dateFilter = '';
    ownerFilter = ''
    changeSinceFilter = ''
    listFilter = '';
    listValue = 'All'

    wonTotalAmount = 0;
    lostTotalAmount= 0;
    overDueTotalAmount = 0;
    openPipelineTotalAmount = 0;
    newTotalAmount = 0;

    totalwonAmountInKilo;
    showAll
    //----Comobox options-----
    options = [
    { label: 'THIS QUARTER', value: 'THIS QUARTER'},
    { label: 'LAST QUARTER', value: 'LAST QUARTER' },
    { label: 'NEXT QUARTER', value: 'NEXT QUARTER' }
    ]
    listOptions = [
        { label: 'All', value: 'All' },
        { label: 'MyOpportunities', value: 'MyOpportunities' },
    ]
    ownerOptions = [
        {label:'Me', value: 'Me'},
        {label:'Everyone', value: 'Everyone'}
    ]
     changeSinceOptions = [
        {label:'Start of the Period', value: 'Start of the Period'},
        {label:'Today', value: 'Today'}
    ]
    columns = [
        { label: 'Opportunity Name', fieldName: 'Name' },
        { label: 'Owner Full Name', fieldName: 'OwnerId' },
        { label: 'Close Date', fieldName: 'CloseDate' },
        { label: 'Probablity', fieldName: 'Probablity' },
        { label: 'Account Name', fieldName: 'Account' },
        { label: 'Stage', fieldName: 'StageName' },
        { label: 'Forecast Category', fieldName: 'ForecastCategoryName' },
        { label: 'Opportunity Score', fieldName: 'IqScore' },
        { label: 'Amount', fieldName: 'Amount' },
    ]
  

//   ---------data declaration ends here------
  handleChange(event) {
        this.dateFilter = event.detail.value;
        console.log("selected Date: " + this.dateFilter);
        this.callListWithDate();
    }
   handleOwnerChange(event){
       this.ownerFilter = event.detail.value;
       console.log('Selected Owner: '+this.ownerFilter);
   }
   handleChangeSince(event){
       this.changeSinceFilter = event.detail.value;
       console.log('change Since  : '+this.changeSinceFilter);
   }
   @wire(getOpportunityList, { dateFilter: '$dateFilter', showAll: true })
    oppoList({ data, err }) {

        if (data) {
    
            this.opportunityList = data.oppoList;
            console.log('----->>>' + JSON.stringify(this.opportunityList))
            this.wonTotalAmount = data.wonOpportunitiesTotal;
            this.lostTotalAmount = data.lostOpportunitiesTotal;
            this.overDueTotalAmount = data.overOpportunitiesTotal;
            this.openPipelineTotalAmount = data.openOpportunitiesTotal;
            this.newTotalAmount = data.newOpportunitiesTotal;

            // this.opportunityList.forEach(opportunity => {
            //     if (opportunity.StageName == 'Closed Won') {

            //         if (opportunity.Amount != null)
            //             this.wonTotalAmount = this.wonTotalAmount + opportunity.Amount;

            // //     }
                
                
            //  let total = this.wonTotalAmount
            //         total.toString().replace(/[^0-9.]/g, '');
            //         if (total < 1000) {
            //             return total;
            //         }
            //         let si = [
            //             { v: 1E3, s: "K" },
            //             { v: 1E6, s: "M" },
            //             { v: 1E9, s: "B" },
            //             { v: 1E12, s: "T" },
            //             { v: 1E15, s: "P" },
            //             { v: 1E18, s: "E" }
            //         ];
            //         let index;
            //         for (index = si.length - 1; index > 0; index--) {
            //             if (total >= si[index].v) {
            //                 break;
            //             }
            //         }
            //         total = (total / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
            //         console.log('TOTAL : '+this.wonTotalAmount);
            //         console.log('TOTAL in K: '+total);
            //         this.totalwonAmountInKilo = total;
            // });
        }
    }

  

    callListWithDate() {
    
        getOpportunityList({ dateFilter: this.dateFilter, showAll: true }).then((data) => {
            this.opportunityList = data.oppoList;
        


        }).catch((error) => {
            console.error(error)
        })
    }


        // handleListChange(event) { 
        //     this.listFilter = event.detail.value; 
        //     console.log("Selected filter: "+ this.listFilter); 
        //     this.callList(this.listFilter);


        // }


    //  callList(listFilter){
    //         getOpportunityList({ dateFilter: this.dateFilter, showAll: listFilter }).then((data) => {
    //             this.opportunityList = data.oppoList;
    //             this.wonTotalAmount  = data.wonOpportunitiesTotal; 
    //             console.log('-->' +this.opportunityList);
    //             console.log(' True or false' +listFilter);
    //         }).catch((error)=>{
    //             console.error(error)
    //         })
    //     }

      //   @wire(getOpportunityListWithList, {listFilter :'$listFilter'})
        //     oppoList({data, err}){
        //         if(data){
        //         this.opportunityList = data
        //         console.log('----->>>' +JSON.stringify(this.opportunityList))

        //         //   this.opportunityList.forEach(opportunity => {
        //         //         if(opportunity.StageName == 'Closed Won'){
        //         //             console.log('OUTPUT : '+opportunity.Name);
        //         //             console.log('OUTPUT : '+opportunity.StageName);
        //         //         }


        //         //     });
        //         }

          // @wire(getOpportunityListWithDate, {dateFilter :'$dateFilter'})
    // oppoList({data, err}){
    //     if(data){
    //     this.opportunityList = data
    //     console.log('----->>>' +JSON.stringify(this.opportunityList))

    //     this.opportunityList.forEach(opportunity => {
    //             if(opportunity.StageName == 'Closed Won'){
    //                 console.log('OUTPUT : '+opportunity.Name);
    //                 console.log('OUTPUT : '+opportunity.StageName);
    //             }


    //         });
    //     }

    // }
}