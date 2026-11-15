# SKYBOUND: FEATHER RUSH ∞

> **ONE TAP. INFINITE SKY. LEGENDARY FLIGHT.**

Game arcade bay một chạm, chạy thẳng trên trình duyệt (PC / Mac / iOS / Android). TypeScript (strict) + Canvas 2D + Web Audio.
**Toàn bộ hình ảnh và âm thanh được tạo bằng code** — không có file ảnh/âm thanh ngoài, không nhạc có bản quyền.

## Chơi ngay (không cần cài gì)

Mở file **`dist/skybound-standalone.html`** bằng cách bấm đúp. Đó là bản một file duy nhất, chạy offline hoàn toàn.

## Cài đặt & chạy

Yêu cầu: Node.js 18+.

```bash
npm install          # esbuild, typescript, tsx
npm run dev          # dev server http://localhost:5173 (tự build lại khi sửa code)
npm run build        # bản production -> dist/ (game.js + skybound-standalone.html)
npm run preview      # phục vụ thư mục dist/ tại http://localhost:4173
npm run typecheck    # kiểm tra kiểu TypeScript
npm test             # test logic: sinh chướng ngại vật, phiên chơi, lưu/tiến trình
npm run test:e2e     # test trình duyệt thật (cần: pip install playwright + Chrome/Chromium)
```

Điều khiển: **chạm / click / Space / ↑ / W** để vỗ cánh · **Esc / P** tạm dừng · **R** chơi lại.
Trong Cài đặt có thể giới hạn nguồn điều khiển (Tất cả / Bàn phím / Chuột / Cảm ứng).

## Đưa lên Vercel

1. Đẩy thư mục này lên GitHub.
2. Vào <https://vercel.com/new> → Import repo. Vercel đọc sẵn `vercel.json`:
   Build Command `npm run build`, Output Directory `dist`. Không cần chọn framework (Other).
3. (Tuỳ chọn) bật online: thêm Environment Variables `SUPABASE_URL` và `SUPABASE_ANON_KEY` trước khi deploy
   (xem mục *Online* bên dưới). Không có hai biến này game vẫn chạy đủ, chỉ ghi rõ "chưa kết nối online".
4. Deploy. Hoặc dùng CLI: `npx vercel --prod`.

Cũng có thể kéo thả thư mục `dist/` vào Netlify / Cloudflare Pages / GitHub Pages — đó chỉ là file tĩnh.

## Nội dung đã hoàn thành

| Hạng mục | Chi tiết |
|---|---|
| **Chế độ (8)** | Classic · Endless · Hardcore · Time Attack · Boss Rush · Daily Challenge (cùng seed cho mọi người trong ngày) · Adventure (10 chương × 2 = 20 màn, 3 sao) · Zen |
| **Nhân vật (20)** | 7 standard (mua xu) · 9 premium (mua ngọc, có yêu cầu cấp) · 4 bí mật. Mỗi skin có màu, kiểu cánh/đuôi/mào, kiểu vỗ cánh, hạt, vệt bay, âm thanh vỗ cánh và âm kỹ năng riêng. 7 trạng thái: idle, bay, rơi, boost, trúng đòn, chiến thắng, chết |
| **Thế giới (12)** | Mỗi thế giới có nền parallax nhiều lớp, bầu trời & chu kỳ ngày/đêm, thời tiết, bảng màu, chướng ngại riêng, âm thanh môi trường, kiểu chuyển cảnh riêng (12 kiểu) và nhạc nền sinh ngẫu nhiên theo chủ đề |
| **Chướng ngại (10)** | Trụ, gai, laser, cổng năng lượng, băng, lửa, bánh răng, đá bay, vòng, cổng thần… — hitbox khớp hình vẽ (một nguồn sự thật duy nhất cho va chạm và render) |
| **Bộ sinh màn** | Thủ tục, có điều kiện *luôn vượt được*: kiểm tra tầm leo/rơi tối đa theo thời gian giữa hai cổng, độ rộng khe tối thiểu, đoạn "thở" sau đoạn khó. Độ khó tự tăng + tự giảm nhẹ nếu người chơi liên tục thua sớm |
| **Power-up (8)** | Shield · Time Warp · Phoenix · Multiplier · Magnet · Ghost · Turbo · Feather Storm |
| **Boss (5)** | Có màn giới thiệu, thanh máu, đòn riêng; dùng trong Boss Rush và các chương Adventure |
| **Tiến trình** | XP & cấp (tối đa 100), xu, ngọc, nhiệm vụ ngày/tuần (đổi theo ngày thật), **41 thành tựu** có độ hiếm, 6 nội dung bí mật có điều kiện mở khoá ghi rõ |
| **Cửa hàng** | Nhân vật, vệt bay (11), hiệu ứng hạt (10), giao diện (6), phụ kiện (6) · xem trước xoay 360° · hộp xác nhận mua · trang bị / bỏ trang bị |
| **Giao diện** | Glassmorphism, 11 màn hình (menu, chọn chế độ, phiêu lưu, thế giới, nhân vật, cửa hàng, nhiệm vụ, thành tựu, xếp hạng, hồ sơ, cài đặt), **mọi màn đều có nút Back**, HUD có mốc 10/25/50/100/200, combo, mạng, thanh boss |
| **Âm thanh** | 100% tổng hợp bằng Web Audio: ~38 hiệu ứng, 6 chủ đề nhạc nhiều lớp theo cường độ, âm môi trường theo thế giới, ducking, fade, chỉnh Master/Nhạc/SFX, tắt tiếng |
| **Cinematic** | Đếm ngược khởi động, chuyển thế giới, boss xuất hiện, kỷ lục mới, game over, mở rương thưởng, slow-motion, rung/zoom camera |
| **Lưu game** | Kiểm tra & ép kiểu dữ liệu, migrate phiên bản (v1→v3), bản sao lưu, bảo vệ không ghi đè dữ liệu tốt bằng dữ liệu rỗng, cứu dữ liệu hỏng sang khoá `.corrupt`, xuất/nhập file |
| **Cài đặt** | Chất lượng Auto/Thấp/Vừa/Cao/Ultra (tự hạ khi FPS thấp), ngôn ngữ VI/EN, FPS, rung màn hình, giảm chuyển động, toàn màn hình, hướng dẫn, kiểu điều khiển, thanh chỉnh độ khó/hitbox nâng cao |
| **Hiệu năng** | Mô phỏng bước cố định 120 Hz (kết quả giống nhau ở 30/60/144 Hz), nội suy khi vẽ, pool hạt (không cấp phát mỗi khung hình), nền được nướng thành texture, tự tạm dừng khi ẩn tab, không rò rỉ (đo: heap & số DOM không tăng sau 14 ván liên tiếp) |

## Online (cần cấu hình — mặc định TẮT)

Game **không có bảng xếp hạng giả**. Khi chưa cấu hình, màn Xếp hạng hiển thị rõ *"Online chưa được kết nối"* và chỉ hiện kỷ lục cá nhân lưu trên máy.

Để bật bảng xếp hạng toàn cầu, bạn bè và đồng bộ đám mây (Supabase, gọi qua REST, không cần SDK):

1. Tạo project tại <https://supabase.com>, vào **SQL Editor** và chạy toàn bộ `supabase/schema.sql`
   (tạo bảng `profiles`, `scores`, `friends`, `saves`, bật RLS, và các hàm `submit_score`, `get_leaderboard`, `add_friend`, `get_friends`).
2. Lấy **Project URL** và **anon public key** (Settings → API).
3. Build với biến môi trường: `SUPABASE_URL=… SUPABASE_ANON_KEY=… npm run build` (hoặc đặt trong Vercel Environment Variables).
4. Trong Authentication → Providers bật Email (hoặc cho phép đăng nhập ẩn danh nếu muốn nút "chơi với tư cách khách").

Điểm số được gửi qua hàm `submit_score` có kiểm tra tính hợp lý phía máy chủ (điểm so với thời gian chơi, số cổng) và giới hạn tần suất 1 lần / 4 giây.
**Lưu ý trung thực:** vì game chạy hoàn toàn ở phía người chơi nên chống gian lận chỉ ở mức kiểm tra hợp lý, không thể tuyệt đối.

## Những thứ cần backend / cấu hình thêm

- Bảng xếp hạng toàn cầu (tuần / ngày), bạn bè, đồng bộ save đám mây, đăng ký/đăng nhập → cần Supabase như trên.
- Thanh toán tiền thật: **không có** (xu và ngọc chỉ kiếm trong game). Nếu muốn bán ngọc cần tích hợp cổng thanh toán và xác thực phía server.
- Quảng cáo / analytics: không tích hợp.

## Kiến trúc

```
src/
  config/    gameConfig.ts       hằng số, tuning vật lý, mức chất lượng
  core/      GameSession.ts      mô phỏng thuần (không đụng DOM): trạng thái, điểm, power-up, boss, sự kiện
             util.ts types.ts events.ts i18n.ts
  data/      skins worlds obstacles powerups bosses modes missions achievements cosmetics
  entities/  Bird Obstacle(Gate) Coin PowerUp
  systems/   PhysicsSystem CollisionSystem ObstacleGenerator SaveManager ProgressionManager
  render/    BirdRenderer ObstacleRenderer WorldRenderer(+world/layers,decor,weather) BossRenderer
             PowerUpRenderer ParticleManager Transitions gfx
  audio/     AudioManager.ts     tổng hợp âm thanh Web Audio
  engine/    Engine.ts Input.ts  canvas, DPR, vòng lặp, nhập liệu
  scenes/    GameScene.ts        nối GameSession với render/âm thanh/HUD
  ui/        dom.ts UI.ts Hud.ts screens/*  (lớp DOM glassmorphism phủ trên canvas)
  net/       NetworkManager.ts   Supabase (REST)
  app/       App.ts              khởi động, định tuyến màn hình, vòng lặp chính
test/        botsim, gen_test, session_test, save_test, e2e/smoke.py, visual/*
supabase/    schema.sql
```

Thiết kế lõi: logic game nằm trong `GameSession` (thuần, kiểm thử được bằng bot trong Node), render và UI chỉ *đọc* trạng thái và nghe sự kiện.
Tọa độ logic cao cố định 800, rộng thay đổi theo tỉ lệ màn hình nên chơi công bằng trên mọi thiết bị.

## Kiểm thử đã chạy

- `gen_test`: 680 lượt bot (mọi loại chướng ngại, điểm bắt đầu 100, độ trễ phản xạ 100 ms) → **0 lần thất bại**, khe hở nhỏ nhất vẫn còn dư 6.8 đơn vị.
- `session_test`: 12 nhóm kiểm tra (điểm, mốc 10/25/50, power-up, boss rush đánh bại cả 5 boss, 20 màn phiêu lưu hoàn thành, daily deterministic, 30/60/144 Hz cho kết quả như nhau).
- `save_test`: kiểm tra save/migrate/khôi phục/chặn ghi đè rỗng, nhiệm vụ, thành tựu, mở khoá, mua đồ.
- `e2e/smoke.py` (Chrome thật, 3 cỡ màn hình): mở mọi màn hình bằng click thật + Back, không tràn ngang, chơi → game over → chơi lại, tạm dừng, tự dừng khi ẩn tab, mua đồ có xác nhận, lưu còn sau khi tải lại, đổi ngôn ngữ, không lỗi console.

## Ghi chú thành thật

- Chưa đo FPS trên thiết bị thật (môi trường build chỉ có Chrome headless render bằng phần mềm: ~50 FPS ở điện thoại, ~15–40 FPS ở khung lớn). Trên máy có GPU kỳ vọng 60 FPS; nếu máy yếu, chế độ chất lượng Auto sẽ tự hạ mức đồ hoạ.
- Chưa thử trên iOS/Android thật; đã kiểm thử bằng giả lập màn hình cảm ứng (dọc & ngang). Âm thanh chỉ bật sau lần chạm đầu tiên (quy định của trình duyệt).
- Nhạc & SFX tổng hợp nên mang chất "chiptune/ambient" chứ không phải nhạc thu âm.
