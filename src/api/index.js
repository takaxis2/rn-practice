// const URL = "http://127.0.0.1:3300";
// export const URL = 'http://14.48.162.122:3300';
// const URL = 'https://10.0.2.2:3300';  
const URL = 'http://172.28.0.1:3300';  

//model
//모델 리스트  
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
//모델 생성
export const postModelAPi = async()=>{
  console.log('postModelAPi');
}
//모델 수정
export const patchModelAPi = async()=>{
  console.log('patchModelAPi');
}

//model-detail
//모델 디테일 1개
export const getOneModelDetailAPi = async()=>{
  console.log('getOneModelDetailAPi');
}
//모델디테일 전체
export const getAllModelDetailAPi = async(id)=>{
  const result = await fetch(`${URL}/model-detail${id}/all`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });
  console.log('getAllModelDetailAPi');
  return result.json();
}
//모델 디테일 생성
export const postModelDetailAPi = async(id,data)=>{
  const result = await fetch(`${URL}/model-detail/${id}`,{
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:data,
  });
  console.log('postModelDetailAPi');
  return result.json();
}
//모델 디테일 수정
export const patcheModelDetailAPi = async(id, data)=>{
  const result = await fetch(`${URL}/model-detail/${id}`,{
    method:'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:data,
  });
  console.log('updateModelDetailAPi');
  return result.json();
}
//모델 디테일 삭제
export const deleteModelDetailAPi = async(id)=>{
  const result = await fetch(`${URL}/model-detail/${id}`,{
    method:'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });
  console.log('deleteModelDetailAPi');
  return result.json();
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