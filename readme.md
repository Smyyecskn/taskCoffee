### E-Ticaret Coffee Sipariş Uygulaması

- Müşteriler;
- Geçmiş siparişler de dahil olmak üzere siparişlerin listesini görebilir.
 -Siparişlerini  listeleyebilir, oluşturabilir, okuyabilir.
-Kuponları görebilir.

- Admin;
 - Coffee tablosu üzerinde CRUD işlemlerini yapabilir,
 - User tablosu üzerinde CRUD işlemlerini yapabilir,Controllerda kullanıcı sadece kendi siparişini görebilmesi için bir filtreleme uyguladım,
 -Order tablosu üzerinden CRUD işlemlerini yapabilir, Order tablosunda siparişleri güncelleyebilir ve silebilir. 
 -Category tablosu üzerinden CRUD işlemlerini yapabilir, Kategoriler admin tarafından düzenlenir oluşturulur ve silinir.
 -Coupon tablosu üzerinden CRUD işlemlerini yapabilir, Kuponları düzenleyebilir,oluşturabilir ve silebilir.

- Liste görünümlerinde arama, sıralama ve sayfalandırma özellikleri bulunmaktadır.(queryHandler)
-Permissionlar bulunmaktadır. admin olarak giriş yapabilmek için 
{
  "email": "admin@gmail.com",
  "password": "Sumeyye1?",
  } bu email ve şifre yeterlidir.

-Kupon kodu algoritmasını oluşturdum.
-Siparişlerdeki ürün adetlerini artırma, azaltma işlemini ve silinmesi işlevlerini ve stok kontrolunu sağladım. İptal veya iade işlevlerini tamamladım.
-sendMail ile kullanıcı giriş yaptığında ve sipariş verdiğinde kullanıcıya ismiyle bir mail göndermeyi sağladım.





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

