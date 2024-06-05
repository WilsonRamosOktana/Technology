public with sharing class KnowledgeController {
    @AuraEnabled
    public static void saveKnowledgeArticle(Map<String, Object> article) {
        try {
        	Knowledge__kav newArticle = new Knowledge__kav();
        	newArticle.Title = (String)article.get('Title');
            newArticle.Summary = (String)article.get('Summary');
            newArticle.Text__c = (String)article.get('Text__c');
            newArticle.IsVisibleInCsp = true;
            newArticle.IsVisibleInPkb = true;
            newArticle.UrlName = (String)article.get('UrlName');
        	insert newArticle;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        } 
    }
}