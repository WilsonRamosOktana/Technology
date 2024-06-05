import { LightningElement, track } from 'lwc';
import saveKnowledgeArticle from '@salesforce/apex/KnowledgeController.saveKnowledgeArticle';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateKnowledgeArticle extends LightningElement {
    @track title = '';
    @track summary = '';
    @track text = '';

    handleTitleChange(event) {
        this.title = event.target.value;
    }

    handleSummaryChange(event) {
        this.summary = event.target.value;
    }

    handleArticleText(event) {
        this.text = event.target.value;
    }

    handleSave() {
        const fields = {
            Title: this.title,
            Summary: this.summary,
            Text__c: this.text,
            UrlName: this.title.trim().toLowerCase().replace(/\s+/g, '-')
        };
        console.log(fields.Title);
        saveKnowledgeArticle({ article: fields })
            .then(() => {
                // Handle success
                this.title = '';
                this.summary = '';
                this.text = '';
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Knowledge Article Created Successfully, this article will be reviewed and categorized by an admin',
                    variant: 'success'
                }));
                window.location.href = '/tech/s/';
            })
            .catch(error => {
                // Handle error
                console.error('Error saving article:', error);
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Error creating record',
                    message: error,
                    variant: 'error'
                }));
            });
    }
}