export default function(){

  this.transition(
    this.fromRoute('index'),
    this.toRoute('leaderboard'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('index'),
    this.toRoute('match'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

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
    this.hasClass('show-matches'),
    this.toValue(true),
    this.use('toDown'),
    this.reverse('toUp')
  );

}
