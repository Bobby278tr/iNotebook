import React from 'react';

function About() {
  return (
    <>
      <section id="page-header" class="about-header">
        <h1 style={{ color: "Red" }}><b>#KnowUs</b></h1>
        <p style={{ color: "Red" }}> <b> Get to know us in detail here and become more closer to us</b></p>
      </section>
      <section id="feature" class="section-p1">
        <div class="fe-box">
          <h6>Privacy</h6>
        </div>
        <div class="fe-box">
          <h6>Adding new Notes</h6>
        </div>
        <div class="fe-box">
          <h6>Editable Notes</h6>
        </div>
        <div class="fe-box">
          <h6>Easy Delete</h6>
        </div>
      </section>
    </>
  );
}

export default About;
