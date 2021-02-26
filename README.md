# Project Summary

> 현재의 날씨정보 및 달력, 그리고 메모

- 개발기간
  + 기획 및 API 결정 / UI 디자인 / 이미지 선별 및 수정 / 기본세팅 및 프로젝트 구조, 라이브러리 설치 : 1일
  + 코드작성 : 7일
  + 테스트 및 리팩토링: 2일
  
- 특징 및 기능
  + 타입스크립트
  + 달력화면을 사용한 간단한 메모작성
  + 기상청 API를 통한 현재 위치 날씨정보 자동 저장
  + sqlite Database CRUD
  + 부르럽고 간결하게 처리된 애니메이션 처리
 
- Project Common Dependencies

  [![React](https://img.shields.io/badge/React-v16.13.1-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/facebook/react)
[![RN](https://img.shields.io/badge/React--Native-v0.63.4-white?style=fla&labelColor=blue&logoColor=blackt&logo=react)](https://github.com/facebook/react-native)
[![Typescript](https://img.shields.io/badge/Typescript-v4.1.3-white?style=flat&labelColor=blue&logoColor=black&logo=typescript)](https://github.com/microsoft/TypeScript)

  [![Redux](https://img.shields.io/badge/Redux-v7.2.2-white?style=flat&labelColor=blue&logoColor=black&logo=redux)](https://github.com/reduxjs/redux)
[![Saga](https://img.shields.io/badge/Redux--saga-v1.1.3-white?style=flat&labelColor=blue&logoColor=black&logo=redux-saga)](https://github.com/redux-saga/redux-saga)
[![Navigation](https://img.shields.io/badge/React--Navigation-v5-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/react-navigation/react-navigation)

  [![Reanimated](https://img.shields.io/badge/React--native--reanimated-v2.0.0--rc.0-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://docs.swmansion.com/react-native-reanimated/)
[![Redash](https://img.shields.io/badge/React--native--redash-v16.0.8-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://github.com/wcandillon/react-native-redash)

  [![기상청API](https://img.shields.io/badge/기상청API-white?style=flat&labelColor=blue&logoColor=black&logo=weather)](https://data.kma.go.kr/api/selectApiList.do?pgmNo=42)
[![Sqlite](https://img.shields.io/badge/React--native--Sqlite--storage-white?style=flat&labelColor=blue&logoColor=black&logo=sqlite)](https://github.com/andpor/react-native-sqlite-storage)

</br></br></br>
***
## 현재 날씨정보 조회
![1](https://user-images.githubusercontent.com/25360777/109237771-94248600-7815-11eb-9bf8-242e66171991.gif)
- [![Reanimated](https://img.shields.io/badge/React--native--reanimated-v2.0.0--rc.0-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://docs.swmansion.com/react-native-reanimated/)
- 기상청 API를 사용한 실시간 날씨 정보
- 새로고침 버튼으로 실시간으로 업데이트 처리
- 설정지역 변경시 애니메이션으로 업데이트 상황 알림 
</br></br></br>
***
## 지역설정
![2-before](https://user-images.githubusercontent.com/25360777/109237782-98e93a00-7815-11eb-8fc4-6103cbcad678.gif)
![2-complete](https://user-images.githubusercontent.com/25360777/109237788-9d155780-7815-11eb-8810-f3f7af6b298b.gif)   
- [![Reanimated](https://img.shields.io/badge/React--native--reanimated-v2.0.0--rc.0-white?style=flat&labelColor=blue&logoColor=black&logo=react)](https://docs.swmansion.com/react-native-reanimated/)
- 최적화 이전 / 최적화 이후
- 대한민국 행정구역 json 데이터를 활용하여, 원하는 지역을 설정
- UI 최적화 처리
</br></br></br>
***
## 달력 및 메모
![3-before](https://user-images.githubusercontent.com/25360777/109237824-ba4a2600-7815-11eb-9d4c-c5971f211b21.gif)
![3-complete](https://user-images.githubusercontent.com/25360777/109237832-bcac8000-7815-11eb-8241-4a3852415f27.gif)   
- 최적화 이전 / 최적화 이후
- dayjs로 계산한 달력 개발
- sqlite를 활용하여 간단한 일일 메모 CRUD
</br></br></br>
***

## 후기 및 계획
- 달력기능 몇개 추가 (년,월 을 직접 선택을 위한 컨텍스트 메뉴 )
- 자동으로 사용자의 위치정보를 받아서 날씨 정보 업데이트 -> 디바이스 자원소비량 증가 (베터리 및 네트워크 사용량)
- 개선 : 수동버튼 처리 -> 사용자 동의사항 감소가 추가로 개선
- React Component 생명주기 개선 및 간단한 코드 리펙토링으로 UI 성능향상.
- 다음 프로젝트를 위한 분석데이터 준비해야 할듯.
