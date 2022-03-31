const initialWagonState = {
    supplies: 100,
    distance: 0,
    days: 0,
    cash: 200
  }
  
  const stateManager = (state = initialWagonState, action) =>{
    switch(action.type){
      case('gather'):{
        return {
          ...state,
          supplies: state.supplies + 15,
          days: state.days + 1
        }
      }
      case('travel'):{
        if( 20 * action.payload > state.supplies){
          return state
        }else{
          return {
            ...state, 
            supplies: state.supplies - ( 20 * action.payload),
            distance: state.distance + ( 10 * action.payload),
            days: state.days + action.payload
          }
        }
      }
      case('tippedWagon'):{
        return {
          ...state,
          supplies: state.supplies - 30,
          days: state.days + 1
        }
      }
      case('sell'):{
        return {
          ...state, 
          supplies: state.supplies - action.payload,
          cash: state.cash + (Math.ceil((0.25 * action.payload)))
        }
      }
      case('buy'):{
        return {
          ...state, 
          supplies: state.supplies + Math.ceil((1.66 *  action.payload)),
          cash: state.cash - action.payload
        }
      }
      case('theft'):{
        return {
          ...state, 
          cash: state.cash / 2
        }
      }
      default:{
        return state
      }
    }
  }
  
  let wagon = stateManager(undefined, {});
  console.log(wagon);
  
  wagon = stateManager(wagon, {type:'travel', payload:1});
  console.log(wagon);
  
  wagon = stateManager(wagon, {type:'gather'});
  console.log(wagon);
  
  wagon = stateManager(wagon, {type:'tippedWagon'});
  console.log(wagon);
  
  wagon = stateManager(wagon, {type:'travel', payload:3});
  console.log(wagon);
  
  wagon = stateManager(wagon, {type:'buy', payload:30});
  console.log(wagon);
  
  wagon = stateManager(wagon, {type:'sell', payload:4});
  console.log(wagon);
  
  wagon = stateManager(wagon, {type:'theft'});
  console.log(wagon);