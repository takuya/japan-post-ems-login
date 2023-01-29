# JAPAN POST Office - EMS service LOGIN

日本郵便の国際EMSアカウントは、ログインしないとアカウント破棄される。そのためログインを自動化しておく。

## 使い方
```shell
npm i 
node ./bin/japan-post-ems-login.js username@gmail.com P@ssWord 
```


## 注意

複数回のログイン失敗でアカウントがロックされる。

解除方法はない。[参考](https://www.post.japanpost.jp/intmypage/faq/013.html)

なお、ログインの成功でもリセットされない模様。

なお、ログイン成功を複数回繰り返しても、ロックされる模様。