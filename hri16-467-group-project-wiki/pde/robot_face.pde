float screenWidth = 960;
float screenHeight = 540;

void setup(){
  size(screenWidth, screenHeight);
  background(255);
  fill(255);
  stroke(3);
}


void draw(){
  fill(255);
  noStroke();
  rect(0,0, width, height);
  stroke(0);
  strokeWeight(10);
  float min = 4 * (float)height / 10;
  float max = 8 * (float)height / 10;
  float center = ((float)max - min)/2 + min; 
  float absPos = constrain(mouseY, min, max);
  float normPos = (mouseY - min)/(max - min);
  normPos = constrain(normPos, 0, 1);
  println(normPos, absPos, min, center);
  if (mouseX < width /10) fill(0);
  if (absPos <= center){
    //arc(width/2, absPos, .6*width, (center - absPos)*2, PI*normPos/2, PI - PI*normPos/2);
    arc(width/2, absPos, .6*width, 4 * (max - min)* abs(normPos - .5), PI*normPos/2, PI - PI*normPos/2);
  }
  else{
    //arc(width/2, absPos, .6*width, (absPos - center)*2, 10*PI/8 - PI*(normPos-.5)/2, 14*PI/8 + PI*(normPos-.5)/2);
    arc(width/2, absPos, .6*width, 4 * (max - min)* abs(normPos - .5), 10*PI/8 - PI*(normPos-.5)/2, 14*PI/8 + PI*(normPos-.5)/2);
  }
  fill(0);
  float r = (max - absPos);
  pushMatrix();
  translate(3.5*width/10, height/5);
  rotate((normPos - .5) * .3 * PI);
  rect(-40, -(height - absPos)/4, 80, (height - absPos)/2, r, r, r, r);
  popMatrix();
  pushMatrix();
  translate(6.5*width/10, height/5);
  rotate((normPos - .5) * .3 * - PI);
  rect(- 40, - (height - absPos)/4, 80, (height - absPos)/2, r, r, r, r);
  popMatrix();
}