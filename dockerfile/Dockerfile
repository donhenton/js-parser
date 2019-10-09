FROM geekykaran/headless-chrome-node-docker:latest

# RUN npm set strict-ssl "false" && npm install gulp -g
RUN npm install gulp -g
ADD  start-chrome.sh .
CMD ["sh", "start-chrome.sh"]