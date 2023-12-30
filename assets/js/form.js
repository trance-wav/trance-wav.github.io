function submitForm(){
    document.getElementById("submissionForm").addEventListener("submit", function(event) {
        event.preventDefault(); 
    
        document.getElementById("successAlert").style.display = "block";

        
        
        
        this.reset();
    });
}

