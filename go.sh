#sudo add-apt-repository ppa:webupd8team/java
#sudo apt-get update
#sudo apt-get install java-common oracle-java8-installer
#sudo apt-get install oracle-java8-set-default
#source /etc/profile
#
#export JAVA_HOME=$(readlink -f /usr/bin/javac | sed "s:/bin/javac::")
#export PATH=$JAVA_HOME/bin:$PATH

#sudo add-apt-repository ppa:cwchien/gradle
#sudo apt-get update
#sudo apt-get install gradle
#sudo add-apt-repository ppa:maarten-fonville/android-studio
#sudo apt-get update
#sudo apt-get install android-studio

#~/Android/Sdk/tools/bin/sdkmanager "platform-tools" "platforms;android-19" "build-tools;19.1.0"

export ANDROID_HOME="/home/crou/Android/"
echo 'ANDROID_HOME'
echo $ANDROID_HOME
whoami
echo 'ANDROID_HOME'
export PATH="${ANDROID_HOME}/SDK/tools/:${ANDROID_HOME}tools/:${ANDROID_HOME}/SDK/platform-tools/:${ANDROID_HOME}platform-tools/:${PATH}";
. ~/.nvm/nvm.sh; nvm use --lts;
corber platform add android
corber proxy requirements
