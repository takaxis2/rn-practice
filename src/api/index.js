// const URL = "http://127.0.0.1:3300";
// export const URL = 'http://14.48.162.122:3300';

import { io } from "socket.io-client";

// const URL = 'https://10.0.2.2:3300';  
const URL = 'http://172.18.192.1:3300';
const socketURL = 'ws://172.18.192.1:3300/notification';  

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
  console.log('getAllmodelAPI');
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
export const getAllModelDetailAPi = async( id )=>{
  const result = await fetch(`${URL}/model-detail/${id}/all`,{
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
export const patchModelDetailAPi = async(id, data)=>{
  const result = await fetch(`${URL}/model-detail/${id}`,{
    method:'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data),
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
export const getAllBomAPi = async(id, type)=>{
  const result = await fetch(`${URL}/bom/${id}/${type}`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });
  
  console.log('getAllBomAPi');
  return result.json();
}

export const getOneBomAPi = async()=>{
  console.log('getOneBomAPi');
}
export const patchBomAPi = async(data)=>{
  const result = await fetch(`${URL}/bom/${data.id}`,{
    method:'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  console.log('patchBomAPi');
  return result.json();
}
export const deleteBomAPi = async()=>{
  console.log('deleteBomAPi')
}

//workplan
export const postWorkPlanAPi = async(data)=>{
  const result = await fetch(`${URL}/work-plan`,{
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

  console.log('postWorkPlanAPi');

  return result.json();
}

export const getAllWorkPlanAPi = async()=>{
  const result = await fetch(`${URL}/work-plan`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });

  console.log('getAllWorkPlanAPi');
  return result.json();
}
export const getAllDoneWorkPlanAPi = async(page)=>{
  const result = await fetch(`${URL}/work-plan/${page}/done`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });

  console.log('getAllDoneWorkPlanAPi');
  return result.json();
}

export const patchWorkPlanAPi = async(id)=>{
  const result = await fetch(`${URL}/work-plan/${id}`,{
    method:'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  });
  console.log('patchWorkPlanAPi');
  return result.json();
}

export const deleteWorkPlanAPi = async(id)=>{
  const result = await fetch(`${URL}/work-plan/${id}`,{
    method:'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  console.log('deleteWorkPlanAPi');
  return result.json();
}


//prodPlan


export const postProdPlanAPi = async(data)=>{
  const result = await fetch(`${URL}/prod-plan`,{
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  console.log('postProdPlanAPi', data);
  return result.json();
}

export const getAllProdPlanAPi = async()=>{
  const result = await fetch(`${URL}/prod-plan`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  console.log('getAllProdPlanAPi');
  return result.json();
}

export const getAllDoneProdPlanAPI = async (num)=>{
  const result = await fetch(`${URL}/prod-plan/${num}/done`,{
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  console.log('getAllDoneProdPlanAPI');
  return result.json();
}

export const patchProdPlanAPi = async(id)=>{
  const result = await fetch(`${URL}/prod-plan/${id}`,{
    method:'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  console.log('patchProdPlanAPi');
  return result.json();
}

export const deleteProdPlanAPi = async(id)=>{
  const result = await fetch(`${URL}/prod-plan/${id}`,{
    method:'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
  console.log('deleteProdPlanAPi');
  return result.json();
}

export const socket = io(`${socketURL}`);