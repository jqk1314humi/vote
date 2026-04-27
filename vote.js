// 初始化维格表 SDK
const vika = new Vika({ token: "uskNUrvWvJoD3VuQ5zW7GYH", fieldKey: "name" });
const datasheet = vika.datasheet("dsttAVvPjCN9mjd1lg");

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('vote-form');
  const messageElement = document.getElementById('message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = form.elements.user.value;
    const answer = form.elements.answer.value;

    // 新增记录
    datasheet.records.create([
      {
        "fields": {
          "user": user,
          "answer": answer
        }
      }
    ]).then(response => {
      if (response.success) {
        messageElement.textContent = '投票成功！';
        messageElement.className = 'success';
        form.reset();
      } else {
        messageElement.textContent = `投票失败: ${response.message || '未知错误'}`;
        messageElement.className = 'error';
      }
    })
    .catch(error => {
      messageElement.textContent = '请求失败，请检查网络连接。';
      messageElement.className = 'error';
      console.error('提交投票时出错:', error);
    });
  });
});