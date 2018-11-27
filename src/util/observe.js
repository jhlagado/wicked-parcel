export { observeProperties, debounceRender };

function observeProperties(object, props) {
    for (let prop of props) {
      
      const hasProp = object.hasOwnProperty(prop)
      let initValue; 
      if (hasProp) {
        initValue = object[prop];
        delete object[prop]; 
      }
      
      const key = `_${prop}`;
      Object.defineProperty(object, prop, {
      
        get() {
          return object[key]
        },
      
        set(value) {
          const oldValue = object[key];
          object[key] = value;
          if (oldValue !== value) {
            object.propertyChangedCallback(
              prop, value, oldValue
            );
          }
        }
      });
      
      if (hasProp) {
        object[prop] = initValue;
      }
      
    }
}  
  
function debounceRender(element) {
	let requested = false;
	const renderFunc = () => {
		requested = false;
		element.render() 
	};
	return () => {
        if (requested) return;
        requested = true;
        requestAnimationFrame(renderFunc);
	}
}
