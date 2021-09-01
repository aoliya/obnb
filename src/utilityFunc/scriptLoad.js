 //adding script func
 export default(stripeScriptUrl)=> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = stripeScriptUrl;
        //once its finished loading the resolve will run
        script.onload = () => {
            resolve();
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    
    })
 }
