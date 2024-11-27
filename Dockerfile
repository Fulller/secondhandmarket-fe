# Sử dụng Node.js LTS
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package.json package-lock.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose port 5173 (cổng mặc định của Vite)
EXPOSE 5173

# Chạy lệnh dev của Vite
CMD ["npm", "run", "dev", "--", "--host"]
