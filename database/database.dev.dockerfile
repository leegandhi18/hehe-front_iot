# DB dockerfile
FROM postgres
RUN apt-get update
RUN apt-get install -y vim
RUN apt-get install -y locales
RUN sed -i 's/^# \(ko_KR.UTF-8\)/\1/' /etc/locale.gen
RUN localedef -f UTF-8 -i ko_KR ko_KR.UTF-8
ENV LC_ALL ko_KR.UTF-8
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=EDUKiT_database