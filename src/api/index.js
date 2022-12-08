// const URL = "http://127.0.0.1:3300";
// export const URL = 'http://14.48.162.122:3300';
// const URL = 'https://10.0.2.2:3300';  
const URL = 'http://172.28.0.1:3300';  

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
  console.log('postModelAPi');
}
export const patchModelAPi = async()=>{
  console.log('patchModelAPi');
}

//model-detail
 export const getOneModelDetailAPi = async()=>{
  console.log('getOneModelDetailAPi');
}

 export const getAllModelDetailAPi = async()=>{
  console.log('getAllModelDetailAPi');
}

 export const postModelDetailAPi = async()=>{
  console.log('postModelDetailAPi');
}

 export const updateModelDetailAPi = async()=>{
  console.log('updateModelDetailAPi');
}

export const deleteModelDetailAPi = async()=>{
  console.log('deleteModelDetailAPi');
}

//bom
export const postBomAPi = async()=>{
  console.log('postBomAPi');
}
export const getAllBomAPi = async()=>{
  console.log('getAllBomAPi');
}
export const getOneBomAPi = async()=>{
  console.log('getOneBomAPi');
}
export const patchBomAPi = async()=>{
  console.log('patchBomAPi');
}
export const deleteBomAPi = async()=>{
  console.log('deleteBomAPi')
}

//workplan
export const postWorkPlanAPi = async()=>{
  console.log('postWorkPlanAPi');
}

export const getAllWorkPlanAPi = async()=>{
  console.log('getAllWorkPlanAPi');
}

export const patchWorkPlanAPi = async()=>{
  console.log('patchWorkPlanAPi');
}

export const deleteWorkPlanAPi = async()=>{
  console.log('deleteWorkPlanAPi');
}


//prodPlan


export const postProdPlanAPi = async()=>{
  console.log('postProdPlanAPi');
}

export const getAllProdPlanAPi = async()=>{
  console.log('getAllProdPlanAPi');
}

export const patchProdPlanAPi = async()=>{
  console.log('patchProdPlanAPi');
}

export const deleteProdPlanAPi = async()=>{
  console.log('deleteProdPlanAPi');
}