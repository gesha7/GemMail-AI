// This is going to help us integrate the API and also have the button in the gnail app.
console.log("Email Writer Extension - Content Script Loaded");


function injectButton() {

}



const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes); // for every mutation we have added the nodes property
        // const hasComposeElements = addedNodes.some(node => 
        //     node.nodeType === Node.ELEMENT_NODE && 
        //     (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]')) // this is the class for the compose button
        // );
        const hasAnyElements = addedNodes.some((node) =>
            node.nodeType === Node.ELEMENT_NODE
          );

        // if (hasComposeElements) {
        //     console.log("Compose window detected");
        //     setTimeout(injectButton, 500); // calling the inject after 500 milliseconds.
        // }

        if (hasAnyElements) {
            console.log("🔍 DOM node(s) added:", addedNodes);
          }
    }


});

observer.observe(document.body, {
    childList: true,
    subtree: true
}
)