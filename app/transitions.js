export default function(){

  this.transition(
    this.hasClass('login'),
    this.toValue(true),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.hasClass('create-match'),

    this.toValue(true),
    this.use('toDown'),
    this.reverse('toUp')
  );

  this.transition(
    this.hasClass('player-listing'),
    this.toValue(true),
    this.use('toDown'),
    this.reverse('toUp')
  );

}
