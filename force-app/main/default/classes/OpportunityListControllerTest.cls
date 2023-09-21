@isTest
public class OpportunityListControllerTest {

    @isTest
    static void testOpportunitiesList() {
        // Create a test user
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];
        User testUser = new User(Alias = 'standt', Email='standarduser@testorg.com',
                            EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                            LocaleSidKey='en_US', ProfileId = p.Id, TimeZoneSidKey='America/Los_Angeles',
                            UserName='standarduserrr@testorg.com');

        // Insert the test user
        insert testUser;

        // Set the test context
        System.runAs(testUser) {
            // Create a test instance of OpportunityListController
            OpportunityListController controller = new OpportunityListController();
            List<Opportunity> oppoList = new List<Opportunity>();
            for(Integer i=0; i< 4; i++){
                Opportunity opp = new Opportunity();
                if(i==0){
                    opp.Name='test'+i;
                    opp.CloseDate = Date.today();
                    opp.OwnerId = testUser.Id;
                    opp.Amount = 2000;
                    opp.StageName = 'Closed Won';
                }
                if(i==1){
                    opp.Name='test'+i;
                    opp.CloseDate = Date.today();
                    opp.OwnerId = testUser.Id;
                    opp.Amount = 2000;
                    opp.StageName = 'Closed Lost';
                }
                if(i==2){
                    opp.Name='test'+i;
                    opp.CloseDate = Date.today();
                    opp.OwnerId = testUser.Id;
                    opp.Amount = 2000;
                    opp.StageName = 'Prospecting';
                }
                 if(i==3){
                    opp.Name='test'+i;
                    opp.CloseDate = Date.today()+1;
                    opp.OwnerId = testUser.Id;
                    opp.Amount = 2000;
                    opp.StageName = 'Qualification';
                }
                 oppoList.add(opp);
               
            }
            
             insert oppoList;
			

            DenormalizedOpportunityList result = OpportunityListController.opportunitiesList('THIS QUARTER', 'Me');

            // Perform assertions based on the expected behavior of the method
            System.assertEquals(2000, result.wonOpportunitiesTotal);
            System.assertEquals(2000, result.lostOpportunitiesTotal);
            // Add more assertions based on the expected behavior and test data
        }
    }
}