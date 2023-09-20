public class OpportunityListSelector {

    @AuraEnabled(cacheable=true)
   public Static List<Opportunity> getOpportunityList(String dateFilter, Boolean showAll){
   String newDateFilter = dateFilter.replace(' ','_');


   String query = 'SELECT Id, Name, Amount, AccountId, Probability, StageName, isWon, isClosed, ForecastCategoryName, IqScore, OwnerId, CloseDate FROM Opportunity '    
     + 'WHERE ' 
     + 'CloseDate = ' + newDateFilter
     + (!showAll ? ' AND OwnerId = ' + UserInfo.getUserId() : '');
   
     List<Opportunity> results = Database.query(String.valueof(query));
       return results;
   }

}