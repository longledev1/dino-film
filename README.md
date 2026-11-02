# 🦖 Dino Film - Modern Movie & TV Discovery Web App

<p align="center">
  <img src="public/images/logo.svg" alt="Dino Film Logo" width="220" />
</p>

<p align="center">
  <strong>An elegant, responsive, and cinematic movie exploration web application built with modern React 19, Vite, and Tailwind CSS v4.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-61dafb?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7.1-646cff?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.1-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TMDB_API-Supported-01d277?logo=themoviedatabase&logoColor=white" alt="TMDB API" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
</p>

---

## 📖 Giới thiệu (Overview)

**Dino Film** là dự án cá nhân được xây dựng và nâng cấp nhằm nghiên cứu, thực hành các kỹ thuật lập trình Frontend hiện đại:
- Thiết kế giao diện UI/UX mượt mà, tối ưu chuyển động và hiệu ứng điện ảnh (Cinematic Dark Mode & Glassmorphism).
- Tích hợp và xử lý dữ liệu bất đồng bộ từ hệ thống RESTful API của **The Movie Database (TMDB)**.
- Quản lý trạng thái ứng dụng, lưu trữ cục bộ (LocalStorage) với đồng bộ sự kiện theo thời gian thực (Custom Events).
- Đảm bảo trải nghiệm đa nền tảng (Mobile First, Tablet, Desktop) hoàn hảo không lỗi giao diện.

> ⚠️ **Disclaimer:** Dự án phục vụ mục đích **học tập & nghiên cứu phi thương mại** (Personal Learning & Portfolio). Website **KHÔNG** cung cấp tính năng phát hoặc xem phim trực tuyến (không vi phạm bản quyền). Người dùng có thể tra cứu thông tin, xem trailer chính thức từ YouTube và quản lý danh sách xem sau (Watchlist).

---

## ✨ Tính năng nổi bật (Key Features)

### 🎬 1. Khám phá & Trải nghiệm Phim đỉnh cao
* **Hero Slider & Banner:** Trình diễn các tác phẩm điện ảnh thịnh hành với hiệu ứng chuyển ảnh mờ chồng (crossfade), hiển thị điểm đánh giá IMDb, thể loại và tóm tắt nội dung.
* **Trailer Player Modal:** Xem trailer chính thức độ nét cao trực tiếp từ YouTube chỉ với một cú nhấp chuột.
* **Top 10 Trending & Chart Toppers:** Danh sách phim và series truyền hình thịnh hành với huy hiệu số thứ tự cách điệu và hiệu ứng hover 3D bắt mắt.
* **Explore by Mood:** Tính năng lọc và đề xuất phim theo tâm trạng độc đáo (Hào hứng, Lãng mạn, Thư giãn, Gay cấn...).

### 🔍 2. Bộ lọc & Tìm kiếm Đa tiêu chí (Advanced Search)
* **Real-time Search:** Tìm kiếm tức thì với cơ chế Debounce thông minh giúp giảm tải request API.
* **Lọc đa chiều:** Phân loại theo thể loại (Genres), quốc gia sản xuất (Countries), loại phương tiện (Movie / TV Shows) và phân trang mượt mà với `react-paginate`.

### 📑 3. Trang Chi tiết Phương tiện & Diễn viên
* **Thông tin chi tiết:** Điểm số rating dạng vòng tròn tỷ lệ phần trăm (Circular Progress), thời lượng, độ tuổi phân loại (Certification/PG), đội ngũ sản xuất chính (Director, Writer).
* **Danh sách Season & Episode:** Hiển thị chi tiết từng mùa và từng tập phim truyền hình kèm thumbnail và ngày phát sóng.
* **Hồ sơ diễn viên (People Profile):** Danh sách diễn viên (Cast), tiểu sử, thông tin cá nhân và toàn bộ tác phẩm tham gia (Filmography).

### 🔖 4. Danh sách Yêu thích (Watchlist & Toast System)
* **Lưu phim tức thì:** Thêm hoặc xóa phim/series vào Watchlist cá nhân chỉ với 1 click từ bất kỳ card nào.
* **Hệ thống Toast thông báo thời gian thực:** Thông báo nổi ở góc màn hình (Mobile ở cạnh dưới, Desktop ở góc phải) kèm poster thu nhỏ, tiêu đề và nút truy cập nhanh.
* **Đồng bộ đa tab:** Dữ liệu lưu trong `localStorage` và tự động cập nhật ngay lập tức giữa các tab trình duyệt.

### 🌐 5. Modal Thông báo Song ngữ (Bilingual Disclaimer Modal)
* Tự động hiển thị khi người dùng lần đầu truy cập website.
* Hỗ trợ chuyển đổi nhanh 2 ngôn ngữ **English (`🇬🇧 EN`)** và **Tiếng Việt (`🇻🇳 VI`)**.
* Tùy chọn ghi nhớ *"Don't show this message again"* và nút mở lại bất cứ lúc nào tại Footer.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Công nghệ | Mô tả |
| :--- | :--- |
| **React 19** | Thư viện giao diện người dùng cốt lõi với hiệu năng cao |
| **Vite 7** | Công cụ build hiện đại, hỗ trợ HMR siêu tốc |
| **Tailwind CSS v4** | Framework CSS tiện ích thế hệ mới với CSS `@theme` tokens |
| **React Router v7** | Điều hướng Single Page Application (SPA) |
| **SWR** | Thư viện React Hooks tìm nạp, lưu trữ dữ liệu thông minh |
| **Swiper 11** | Thư viện slider/carousel hỗ trợ cử chỉ cảm ứng di động |
| **React Icons** | Bộ icon phong phú (FontAwesome, Ionicons, GameIcons) |
| **React Hook Form** | Quản lý form tìm kiếm tối ưu hiệu năng |

---

## 🎨 Hệ màu thiết kế (Theme Color Palette)

Dự án được cấu hình màu sắc tập trung tại `src/index.css` sử dụng CSS Variables chuẩn Tailwind v4:
- **Primary Color (Xanh rừng điện ảnh):** `#58866e` (`--color-primary`)
- **Secondary Color (Vàng kim cát):** `#cdb370` (`--color-secondary`)
- **Background Dark:** `#181b24` & `#161922`

---

## 🚀 Hướng dẫn Cài đặt & Chạy cục bộ (Getting Started)

### 1. Yêu cầu môi trường
- **Node.js:** phiên bản `18.x` hoặc cao hơn
- **npm** hoặc **yarn** / **pnpm**

### 2. Cài đặt dự án

```bash
# Clone repository
git clone https://github.com/longledev1/dino-film.git

# Di chuyển vào thư mục dự án
cd dino-film

# Cài đặt các gói phụ thuộc
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` tại thư mục gốc của dự án và thêm API Key từ TMDB:

```env
VITE_API_TOKEN=your_tmdb_api_read_access_token
```

*(Bạn có thể đăng ký tài khoản miễn phí và lấy API Token tại [The Movie Database - TMDB](https://www.themoviedb.org/settings/api))*

### 4. Chạy dự án ở môi trường phát triển

```bash
npm run dev
```
Truy cập ứng dụng tại `http://localhost:5173`.

### 5. Build cho Production

```bash
# Kiểm tra lỗi cú pháp và quy chuẩn code
npm run lint

# Đóng gói sản phẩm
npm run build

# Xem thử bản build production
npm run preview
```

---

## 📁 Cấu trúc thư mục (Project Directory)

```text
dino-film/
├── public/                     # Tài nguyên tĩnh (Logo, favicon, placeholder images)
├── src/
│   ├── assets/                 # Hình ảnh, tài nguyên cục bộ
│   ├── components/             # Các components tái sử dụng
│   │   ├── DisclaimerModal/    # Modal thông báo dự án song ngữ Anh/Việt
│   │   ├── FeatureMovie/       # Banner phim nổi bật
│   │   ├── Header/             # Thanh điều hướng chính & thanh tìm kiếm
│   │   ├── Footer/             # Chân trang & liên kết hỗ trợ
│   │   ├── ImageComponent/     # Component load ảnh mượt với Skeleton Shimmer
│   │   ├── Loading/            # Skeleton loaders dạng card & trang
│   │   ├── MediaList/          # Danh sách & Card phim (MovieCard, CircularProgress)
│   │   ├── MediaSlider/        # Slider trình diễn anime, phim thịnh hành
│   │   ├── MovieNew/           # Top 10 Trending Cards cách điệu
│   │   ├── SectionHeader/      # Tiêu đề mục chuyên nghiệp với badges & icons
│   │   └── TrailerVideo/       # Modal phát trailer YouTube
│   ├── constant/               # Hằng số, API URLs, danh mục thể loại
│   ├── context/                # Context Providers (ModalProvider, ToastContext)
│   ├── hooks/                  # Custom Hooks (useWatchlist, useFetch,...)
│   ├── layouts/                # MainLayout layout tổng
│   ├── pages/                  # Các trang chính (Home, MovieDetail, TVShow, People, Search, Watchlist)
│   ├── router/                 # Cấu hình routes với React Router v7
│   ├── services/               # API fetching services
│   ├── App.css                 # CSS toàn cục bổ trợ
│   ├── index.css               # Cấu hình Tailwind v4 @theme & CSS Variables
│   └── main.jsx                # Điểm khởi chạy ứng dụng
├── package.json
└── vite.config.js
```

---

## 📄 Bản quyền & Lời cảm ơn (Attribution & License)

- Dữ liệu phim, hình ảnh và poster được cung cấp bởi [The Movie Database (TMDB)](https://www.themoviedb.org/).
- Dự án này sử dụng TMDB API nhưng không được TMDB chứng thực hoặc cấp phép chính thức.
- Mã nguồn được phân phối dưới giấy phép **MIT License**.

---

<p align="center">
  Phát triển với ❤️ bởi <strong>Long Le</strong> (@longledev1) • <em>Dino Film 2026</em>
</p>
