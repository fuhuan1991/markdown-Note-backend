const initialText = 
'# higher-order component \n---------------\n\nA higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.\nConcretely, a higher-order component is a function that takes a component and returns a new component.\n\n**const** *EnhancedComponent* = *higherOrderComponent*(WrappedComponent);\n\nWhereas a component transforms props into UI, a higher-order component transforms a component into another component.\nHOCs are common in third-party React libraries, such as Redux’s connect and Relay’s createFragmentContainer.'
export default initialText;

