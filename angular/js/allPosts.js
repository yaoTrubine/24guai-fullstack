var app = angular.module('adminApp',['ngResource','ngRoute']);
app.controller('queryController',['$scope','$resource',function($scope,$resource){
    var Posts = $resource('http://localhost:3000/posts');
    Posts.query(function(posts){
        $scope.posts = posts;
        console.log(posts);
        console.log(posts.length);
        console.log($scope.posts);
        console.log($scope.posts.length);
        
        $scope.pageSize = 2;
        $scope.pages = Math.ceil($scope.posts.length / $scope.pageSize);
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        $scope.setData = function(){
            $scope.items =  $scope.posts.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));
        }
        $scope.items = $scope.posts.slice(0,$scope.pageSize);
         for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
          //打印当前选中页索引
        $scope.selectPage = function (page) {
            //不能小于1大于最大
            if (page < 1 || page > $scope.pages) return;
            //最多显示分页数5
            if (page > 2) {
                //因为只显示5个页数，大于2页开始分页转换
                var newpageList = [];
                for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            console.log("选择的页：" + page);
        };
        //设置当前选中页样式
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一页
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一页
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
    });
}]);