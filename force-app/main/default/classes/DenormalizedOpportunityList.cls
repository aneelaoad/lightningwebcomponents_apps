public class DenormalizedOpportunityList {
    @AuraEnabled
     public Decimal openOpportunitiesTotal;
     @AuraEnabled
     public Decimal newOpportunitiesTotal;
     @AuraEnabled
     public Decimal wonOpportunitiesTotal ;
     @AuraEnabled
     public Decimal lostOpportunitiesTotal ;
     @AuraEnabled
     public Decimal overdueOpportunitiesTotal ;
     @AuraEnabled
     public List<Opportunity> oppoList;
}