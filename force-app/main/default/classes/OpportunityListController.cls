public class OpportunityListController {
    @AuraEnabled(cacheable=true)
 public static DenormalizedOpportunityList opportunitiesList(String dateFilter, Boolean showAll){

 // List<DenormalizedOpportunityList> denormalizedList = new List<DenormalizedOpportunityList>();


  DenormalizedOpportunityList denormalizedList = new DenormalizedOpportunityList();
 List<Opportunity> opportunityList = new List<Opportunity>();
 opportunityList = OpportunityListSelector.getOpportunityList(dateFilter, showAll);
 System.debug('TEST-->' +opportunityList);
     Decimal wonOppoAmountTotal = 0;
     Decimal lostOppoAmountTotal = 0;
     Decimal overdueOppoAmountTotal = 0;
     Decimal openOppoAmountTotal = 0;
     Decimal newOppoAmountTotal = 0;
 denormalizedList.oppoList = opportunityList;

 for (Opportunity oppo : opportunityList) {
   if(oppo.Amount != null){
    if(oppo.StageName == 'Closed Won' ){  
      wonOppoAmountTotal += oppo.Amount;  
     System.debug('amount--->' +oppo.Amount);
    }
    if(oppo.StageName == 'Closed Lost'  ){
      lostOppoAmountTotal +=oppo.Amount;
    }
    if(oppo.StageName == 'Prospecting'){
      newOppoAmountTotal += oppo.Amount;
    }
  if(oppo.isClosed == false){
      openOppoAmountTotal += oppo.Amount;
    }
   if(oppo.CloseDate > Date.today()){
     overdueOppoAmountTotal += oppo.Amount;

   }
   }
 }
 // denormalizedList.oppoList = opportunityList;
 denormalizedList.wonOpportunitiesTotal = wonOppoAmountTotal;
 denormalizedList.lostOpportunitiesTotal = lostOppoAmountTotal;
 denormalizedList.openOpportunitiesTotal = openOppoAmountTotal;
 denormalizedList.newOpportunitiesTotal = newOppoAmountTotal;
 return denormalizedList;
 }
}