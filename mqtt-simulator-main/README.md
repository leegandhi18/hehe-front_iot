# mqtt 자동 발생기
mqtt로 특정 데이터를 자동으로 발생 시키는 기능

# local 실행방법
(1) nodejs 설치 후, volume 폴더로 이동한다. \
(2) npm i 로 패키지 설치한다.\
(3) npm start로 시뮬레이터 api서버를 실행시킨다.

# docker-compose로 실행
(1) docker-compose up -d 로 실행 \
(2) docker-compose exec simulator-server npm i \
(3) docker-compose exec simulator-server npm run docker

# 시뮬레이터 실행 방법
(1) POST /start를 실행해주면 된다. (포스트맨등으로 실행) \
(2) 옵션 설정하기 : body에다가는 옵션을 설정할 수 있음.
   * datainterval(초) : 데이터 발생 주기를 설정할 수 있다. (default: 1)
   * endtime(초) : 데이터 발생 시간을 설정 할 수 있다. (default: 2)