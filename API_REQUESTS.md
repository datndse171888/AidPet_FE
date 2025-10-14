# API Request Bodies cho AidPet

## Authentication

### 1. Login Admin
**POST** `/api/users/login`

```json
{
  "userName": "admin",
  "password": "123456"
}
```

**Response:**
```json
{
  "uuid": "e7f2fa8a-70f5-4474-9171-fcf850d70876",
  "userName": "admin",
  "fullName": "Quản Trị Viên",
  "email": "admin@aidpet.com",
  "phone": "0901112223",
  "role": "ADMIN",
  "token": "eyJhbGciOiJIUzM4NCJ9..."
}
```

### 2. Login Shelter
**POST** `/api/users/login`

```json
{
  "userName": "shelter2",
  "password": "123456"
}
```

---

## Category Blog

### 3. Tạo Category Blog
**POST** `/api/categoryBlog`
**Headers:** `Authorization: Bearer YOUR_ADMIN_TOKEN`

```json
{
  "name": "Rescue Stories"
}
```

```json
{
  "name": "Adoption Events"
}
```

```json
{
  "name": "Volunteer Programs"
}
```

```json
{
  "name": "Health Tips"
}
```

```json
{
  "name": "Success Stories"
}
```

---

## Posts

### 4. Tạo Post
**POST** `/api/post/create`
**Headers:** `Authorization: Bearer YOUR_ADMIN_TOKEN`

```json
{
  "topic": "Help Us Save Abandoned Puppies - Urgent Medical Care Needed",
  "htmlContent": "<p>We recently rescued several abandoned puppies who need urgent medical care and loving homes. These adorable little ones were found in poor condition but are now receiving the care they need at our shelter.</p><p>They need:</p><ul><li>Medical treatment for malnutrition</li><li>Vaccinations</li><li>Spaying/neutering</li><li>Loving forever homes</li></ul>",
  "deltaContent": "{\"ops\":[{\"insert\":\"We recently rescued several abandoned puppies who need urgent medical care and loving homes...\"}]}",
  "categoryId": "2440fac1-7fe4-49af-872c-edefa55dc7f4",
  "thumbnail": "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

```json
{
  "topic": "Cat Adoption Event This Weekend",
  "htmlContent": "<p>Join us this weekend for our special cat adoption event! We have many beautiful cats looking for their forever homes. All cats are vaccinated and spayed/neutered.</p><p>Event details:</p><ul><li>Date: Saturday & Sunday</li><li>Time: 9 AM - 5 PM</li><li>Location: Our shelter</li><li>All cats are health-checked</li></ul>",
  "deltaContent": "{\"ops\":[{\"insert\":\"Join us this weekend for our special cat adoption event...\"}]}",
  "categoryId": "CATEGORY_UUID_FROM_STEP_3",
  "thumbnail": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

```json
{
  "topic": "New Volunteer Training Program Starting Next Month",
  "htmlContent": "<p>We are starting a new volunteer training program next month. Learn how to properly care for animals and help us make a difference in their lives.</p><p>Training includes:</p><ul><li>Animal handling techniques</li><li>Basic medical care</li><li>Behavioral understanding</li><li>Safety protocols</li></ul>",
  "deltaContent": "{\"ops\":[{\"insert\":\"We are starting a new volunteer training program next month...\"}]}",
  "categoryId": "CATEGORY_UUID_FROM_STEP_3",
  "thumbnail": "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

```json
{
  "topic": "Pet Health Tips for Winter Season",
  "htmlContent": "<p>Winter is coming and it's important to keep your pets healthy during the cold season. Here are some essential tips to help your furry friends stay warm and comfortable.</p><p>Winter care tips:</p><ul><li>Keep pets indoors during extreme cold</li><li>Provide warm bedding</li><li>Check paws for ice and salt</li><li>Adjust feeding for winter activity</li></ul>",
  "deltaContent": "{\"ops\":[{\"insert\":\"Winter is coming and it's important to keep your pets healthy...\"}]}",
  "categoryId": "CATEGORY_UUID_FROM_STEP_3",
  "thumbnail": "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

```json
{
  "topic": "Success Story: Max Finds His Forever Home",
  "htmlContent": "<p>We are thrilled to share the heartwarming story of Max, a German Shepherd who found his perfect family after months of waiting. This is what makes our work so rewarding!</p><p>Max's journey:</p><ul><li>Rescued from the streets</li><li>Rehabilitated for 3 months</li><li>Found his perfect family</li><li>Now living happily ever after</li></ul>",
  "deltaContent": "{\"ops\":[{\"insert\":\"We are thrilled to share the heartwarming story of Max...\"}]}",
  "categoryId": "CATEGORY_UUID_FROM_STEP_3",
  "thumbnail": "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

---

## Shelter

### 5. Tạo Shelter
**POST** `/api/shelter`
**Headers:** `Authorization: Bearer YOUR_ADMIN_TOKEN`

```json
{
  "shelterName": "Trung Tâm Cứu Hộ Động Vật Hà Nội",
  "shelterAmount": 50,
  "address": "123 Đường Cứu Hộ, Quận Ba Đình, Hà Nội",
  "phone": "024-1234-5678",
  "email": "contact@shelter.com",
  "description": "Chúng tôi chuyên cứu hộ và chăm sóc động vật bị bỏ rơi",
  "accountUuid": "e7f2fa8a-70f5-4474-9171-fcf850d70876"
}
```

---

## Animals

### 6. Tạo Animal
**POST** `/api/animals`
**Headers:** `Authorization: Bearer YOUR_SHELTER_TOKEN`

```json
{
  "shelterUuid": "SHELTER_UUID_FROM_STEP_5",
  "categoryAnimalsUuid": "a584c4a7-12cb-4485-ac30-e36e0c445450", //name: dog, des: dog lover
  "name": "Buddy",
  "age": 2,
  "breed": "Golden Retriever",
  "gender": "Male",
  "description": "Friendly and energetic dog looking for a loving home. Great with children and other pets.",
  "img_url": "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

```json
{
  "shelterUuid": "SHELTER_UUID_FROM_STEP_5",
  "categoryAnimalsUuid": "ANIMAL_CATEGORY_UUID",
  "name": "Luna",
  "age": 1,
  "breed": "Persian Cat",
  "gender": "Female",
  "description": "Beautiful long-haired cat, very gentle and calm. Perfect for a quiet home.",
  "img_url": "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

```json
{
  "shelterUuid": "SHELTER_UUID_FROM_STEP_5",
  "categoryAnimalsUuid": "ANIMAL_CATEGORY_UUID",
  "name": "Max",
  "age": 3,
  "breed": "German Shepherd",
  "gender": "Male",
  "description": "Loyal and protective dog, great with families. Needs experienced owner.",
  "img_url": "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

```json
{
  "shelterUuid": "SHELTER_UUID_FROM_STEP_5",
  "categoryAnimalsUuid": "ANIMAL_CATEGORY_UUID",
  "name": "Whiskers",
  "age": 2,
  "breed": "Maine Coon",
  "gender": "Male",
  "description": "Large and fluffy cat, loves to play. Very social and friendly.",
  "img_url": "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

```json
{
  "shelterUuid": "SHELTER_UUID_FROM_STEP_5",
  "categoryAnimalsUuid": "ANIMAL_CATEGORY_UUID",
  "name": "Bella",
  "age": 1,
  "breed": "Poodle",
  "gender": "Female",
  "description": "Small and cute dog, perfect for apartment living. Very intelligent and trainable.",
  "img_url": "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=400"
}
```

---

## Thứ tự thực hiện

1. **Login Admin** → Lấy token admin
2. **Tạo Categories** → Lấy category UUIDs
3. **Tạo Posts** → Sử dụng category UUIDs
4. **Tạo Shelter** → Lấy shelter UUID
5. **Login Shelter** → Lấy token shelter (nếu cần)
6. **Tạo Animals** → Sử dụng shelter UUID và animal category UUIDs

## Lưu ý

- Thay thế `YOUR_ADMIN_TOKEN` và `YOUR_SHELTER_TOKEN` bằng token thật từ login
- Thay thế `CATEGORY_UUID_FROM_STEP_3` bằng UUID thật từ response tạo category
- Thay thế `SHELTER_UUID_FROM_STEP_5` bằng UUID thật từ response tạo shelter
- Thay thế `ANIMAL_CATEGORY_UUID` bằng UUID thật từ animal categories có sẵn
- Sử dụng Swagger UI tại `http://localhost:8082/swagger-ui.html` để test
