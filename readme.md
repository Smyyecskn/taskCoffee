### E-Ticaret Coffee Sipariş Uygulaması

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    package.json
    readme.md
    src/
        config/
            dbConnection.js
        controllers/
            auth.js
            category.js
            coffee.js
            coupon.js
            order.js
            token.js
            user.js
        helpers/
            passwordEncrypt.js
            sendMail.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            permissions.js
            queryHandler.js
        models/
            category.js
            coffee.js
            coupon.js
            order.js
            token.js
            user.js
        routes/
            auth.js
            category.js
            coffee.js
            coupon.js
            index.js
            order.js
            token.js
            user.js
```

Routelar şu şekildedir: Bu şekilde giriş sağlayabilirsiniz.
-Permissionlar bulunmaktadır. admin olarak giriş yapabilmek için :
{
  "email": "admin@gmail.com",
  "password": "Sumeyye1?",
  } bu email ve şifre yeterlidir.


-http://127.0.0.1:8000/category
-http://127.0.0.1:8000/coupon
-http://127.0.0.1:8000/coffee
-http://127.0.0.1:8000/order
-http://127.0.0.1:8000/user
--http://127.0.0.1:8000/auth/login




- Müşteriler;
- Geçmiş siparişler de dahil olmak üzere siparişlerin listesini görebilir.
- Kategorileri görebilir.
- Kahveleri görebilir. Kahve satın alabilirler.
 -Siparişlerini  listeleyebilir, oluşturabilir, okuyabilir.
-Kuponları görebilir.

- Admin;
 - Coffee tablosu üzerinde CRUD işlemlerini yapabilir,
 - User tablosu üzerinde CRUD işlemlerini yapabilir,Controllerda kullanıcı sadece kendi siparişini görebilmesi için bir filtreleme vardır,
 -Order tablosu üzerinden CRUD işlemlerini yapabilir, Order tablosunda siparişleri güncelleyebilir ve silebilir. 
 -Category tablosu üzerinden CRUD işlemlerini yapabilir, Kategoriler admin tarafından düzenlenir oluşturulur ve silinir.
 -Coupon tablosu üzerinden CRUD işlemlerini yapabilir, Kuponları düzenleyebilir,oluşturabilir ve silebilir.

- Liste görünümlerinde arama, sıralama ve sayfalandırma özellikleri bulunmaktadır.(queryHandler)


-Kupon kodu algoritmasını vardır.
-Siparişlerdeki ürün adetlerini artırma, azaltma işlemini ve silinmesi işlevlerini ve stok kontrolu vardır.Stoklarda iptal veya iade işlevleri vardır.
-Kuyruklama yapısını vardır.
-sendMail ile kullanıcı giriş yaptığında ve kullanıcı sipariş oluşturdugunda kullanıcıya ismiyle bir mail göndermeyi sağladım.
-paswordEncrypt ile kullanıcının passwordunu şifreleme özelliği vardır.
-sync dosyasında coffeeleri veritabanına eklenmiştir.

