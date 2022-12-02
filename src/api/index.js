// const URL = "http://127.0.0.1:3300";
export const URL = 'http://14.48.162.122:3300';
// const URL = 'https://10.0.2.2:3300';  

//model
export const getAllModelApi = async () => {
  const result = await fetch(`${URL}/model`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });
  return await result.json();
};
export const postModelAPi = async()=>{
  
}
export const patchModelAPi = async()=>{
  
}

//model-detail
 export const getOneModelDetailAPi = async()=>{

}

 export const getAllModelDetailAPi = async()=>{
  
}

 export const postModelDetailAPi = async()=>{
  
}

 export const updateModelDetailAPi = async()=>{
  
}

export const deleteModelDetailAPi = async()=>{
  
}

//bom
export const postBomAPi = async()=>{
  
}
export const getAllBomAPi = async()=>{
  
}
export const getOneBomAPi = async()=>{
  
}
export const patchBomAPi = async()=>{
  
}
export const deleteBomAPi = async()=>{
  
}

//workplan
export const postWorkPlanAPi = async()=>{
  
}

export const getAllWorkPlanAPi = async()=>{
  
}

export const patchWorkPlanAPi = async()=>{
  
}

//prodPlan


export const postProdPlanAPi = async()=>{
  
}

export const getAllProdPlanAPi = async()=>{
  
}

export const patchProdPlanAPi = async()=>{
  
}