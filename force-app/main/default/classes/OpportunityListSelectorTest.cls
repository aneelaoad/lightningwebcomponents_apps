@isTest
public class OpportunityListSelectorTest {
    @isTest
    static void testGetOpportunityListWithOwnerFilterMe() {
        // Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];
       
        // // Create a test user
        // User testUser = new User(
        //     FirstName = 'Test',
        //     LastName = 'User',
        //     Alias = 'tuser',
        //     Email = 'testuser@test.com',
        //     Username = 'testuseraa@test.com',
        //     ProfileId = UserInfo.getProfileId(),
        //     EmailEncodingKey = 'UTF-8',
        //     LanguageLocaleKey = 'en_US',
        //     TimeZoneSidKey = 'America/New_York',
        //     LocaleSidKey='en_US'
       		
        // );
        // insert testUser;
        
        // System.runAs(testUser) {
        //     // Create a test Opportunity
        //     Opportunity testOpportunity = new Opportunity(
        //         Name = 'Test Opportunity',
        //         CloseDate = Date.today(),
        //         OwnerId = testUser.Id,
        //         StageName = 'Prospecting'
        //     );
        //     insert testOpportunity;
 
                Opportunity testOpportunity = new Opportunity(
                Name = 'Test Opportunity',
                CloseDate = Date.today(),
               
                StageName = 'Prospecting'
            );
            insert testOpportunity;
        List<Opportunity> opportunities = OpportunityListSelector.getOpportunityList('THIS QUARTER', 'Me');
        
        System.assertEquals(1, opportunities.size());
        System.assertEquals(testOpportunity.Id, opportunities[0].Id);
    }
    
    }
