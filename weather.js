var temp, city, lat, lon, name, temp_max, temp_min;
          // 온도, 도시, 위도, 경도, 지역이름, 최고기온, 최저기온
          var city_button; // 버튼 가리기 위해 사용하는 변수
          var init_button;


      const getJSON = function(url, callback) { // 자바스크립트에서 JSON 파일 로드과정을 입력
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.responseType = 'json';
          xhr.onload = function() {
            const status = xhr.status;
            if(status === 200) {
              callback(null, xhr.response);
            } else {
              callback(status, xhr.response);
            }
          };
          xhr.send();
        };
        
      // GPS를 이용하여 위도경도를 받아오는 방식_ 정확도가 너무 떨어져서 보류
      //http://api.openweathermap.org/data/2.5/weather?lat=&lon=&appid=4375227894b706fbc4e46675bba7a98a
      /*
        function getLocation_(){ // 위도경도로 검색
        getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=4375227894b706fbc4e46675bba7a98a', // 각각의 위도 경도를 입력하여 해당 위치의 날씨정보를 가져옴
        function (err, data) {
          if(err !== null) {
            alert('error' + err); // 넣은 값이 오류가 생길 시 에러코드와 함께 문구발생
          } else {
            temp= data.main.temp-273; // 기온
            city= data.name; // 지역이름
          }
        });
      }
          function getLocation(){ //위도경도 받아오기 
            if (navigator.geolocation) { // GPS를 지원하면
          navigator.geolocation.watchPosition(function(position) {
            lat= position.coords.latitude // 위도
            lon= position.coords.longitude // 경도;
          }, function(error) {
            console.error(error);
          }, {
            enableHighAccuracy: true, // 배터리를 소모해 더욱 더 정확한 정보 받아옴
            maximumAge: 0,
            timeout: Infinity
          });
        } else {
          alert('GPS를 지원하지 않습니다');
        }
          }
      */
        
      // 위치를 입력하면 해당 지역의 정보를 가져오는 방식
        //http://api.openweathermap.org/data/2.5/weather?q=asan&appid=4375227894b706fbc4e46675bba7a98a&units=metric
        function service(name){ // 위치를 입력받고 해당 위치의 정보 제공
          getJSON('http://api.openweathermap.org/data/2.5/weather?q='+name+'&appid=4375227894b706fbc4e46675bba7a98a&units=metric', // 도시명을 입력하여 해당 도시의 날씨정보를 가져옴
        function (err, data) {
          if(err !== null) {
            alert('error' + err); // 넣은 값이 오류가 생길 시 에러코드와 함께 문구발생
          } else {
            temp= data.main.temp; // 기온
            //lat = data.coord.lat; // 위도경도를 받아오는 코드인데, 사용보류
            //lon = data.coord.lon;
            //temp_max= data.main.temp_max; // 최고기온 입력보류
            //temp_min= data.main.temp_min; // 최저기온 입력보류
            city= data.name; // 지역이름
            document.getElementById("information").innerText=
            city +"\n기온 : "+Math.round(temp*10)/10; // 화면에 기온, 최고기온, 최저기온, 지역이름을 출력하는 부분
            //+"\n최고 기온 : "+Math.round(temp_max*10)/10
            //+"\n최저 기온 : "+Math.round(temp_min*10)/10
          }
        });
          city_button = document.getElementById('city_button'); // 버튼 입력시 버튼 가리기
          city_button.style.visibility="hidden";
          init_button = document.getElementById('init');
          init_button.style.visibility="visible";// hidden으로 하고 나오게 하는건 왜안되는지 확인해봐야함..................
        }