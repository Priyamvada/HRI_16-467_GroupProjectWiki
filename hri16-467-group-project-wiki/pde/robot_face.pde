

void setup(){
  size(screen_width, screen_height);
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
  float absPos = constrain(smile_y, min, max);
  float normPos = (smile_y - min)/(max - min);
  normPos = constrain(normPos, 0, 1);
  println(normPos, absPos, min, center);
  

  if(connectionState == -1) {
    stroke(0);
    fill(0);
    textSize(120);
    String t1 = "Please Donate";
    float s1 = textWidth(t1);
    text(t1, width/2 - s1/2, 2.5*height/10); 
    textSize(350);
    String t2 = "$";
    float s2 = textWidth(t2);
    text(t2, width/2 - s2/2, 8.5*height/10);
  }

  else  {
    //Fill mouth when robot is speaking
    if (speaking == true) {
      timing++;
      float base = 40;
      if((timing > base && timing < (6/4)*base) || (timing > (7/4)*base && timing < (9/4)*base)) {
        fill(0);
      } else if(timing >= (9/4)*base)  {
        timing = 0;
        fill(255);
      } else  {
        fill(255);
      }
    }
    else fill(255);

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

  
}