import { LightningElement, wire, api } from 'lwc';
import getOpportunityList from '@salesforce/apex/OpportunityListController.opportunitiesList';

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

            
            this.wonTotalAmount = this.convertToInternationalCurrencySystem(data.wonOpportunitiesTotal);
            this.convertToInternationalCurrencySystem
            this.lostTotalAmount = this.convertToInternationalCurrencySystem(data.lostOpportunitiesTotal);
            this.overDueTotalAmount = this.convertToInternationalCurrencySystem(data.overOpportunitiesTotal);
            this.openPipelineTotalAmount = this.convertToInternationalCurrencySystem(data.openOpportunitiesTotal);
            this.newTotalAmount =this.convertToInternationalCurrencySystem(data.newOpportunitiesTotal);
            
        }
    }

    convertToInternationalCurrencySystem (labelValue) {

        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9
    
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
    
        : Math.abs(Number(labelValue));
    
    }

    callListWithDate() {
    
        getOpportunityList({ dateFilter: this.dateFilter, showAll: true }).then((data) => {
            this.opportunityList = data.oppoList;
        


        }).catch((error) => {
            console.error(error)
        })
    }


       
}